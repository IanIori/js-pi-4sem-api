import { Request, Response } from 'express'
import User from '../../models/user.entity'
import Token from '../../models/token.entity'
import bcrypt from 'bcrypt'
import Newsletter from '../../models/news.entity'

export default class AuthController {
  static async store (req: Request, res: Response) {
    const { nome, cpf, email, senha, confirmeSenha } = req.body

    if (!nome) return res.status(400).json({ error: 'O nome é obrigatório' })
    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!cpf) return res.status(400).json({ error: 'O cpf é obrigatório' })
    if (!senha) return res.status(400).json({ error: 'A senha é obrigatória' })
    if (senha != confirmeSenha) return res.status(400).json({ error: 'A confirmação está incorreta' })  

    // Verifica se o email já está cadastrado
    const userCheck = await User.findOneBy({ email })
    if (userCheck) return res.status(400).json({ error: 'Email já cadastrado' })

    const user = new User()
    user.nome = nome
    user.cpf = cpf
    user.email = email
    user.senha = senha
    // Gera a hash da senha com bcrypt - para não salvar a senha em texto puro
    user.senha = bcrypt.hashSync(senha, 10)
    await user.save()

    // Não vamos retornar a hash da senha
    return res.status(201).json({
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      senha: user.senha
    })
  }

  static async login (req: Request, res: Response) {
    const { email, senha } = req.body

    if (!email) return res.status(400).json({ error: 'O email é obrigatório' })
    if (!senha) return res.status(400).json({ error: 'A senha é obrigatória' })

    const user = await User.findOneBy({ email })
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' })

    const senhaMatch = bcrypt.compareSync(senha, user.senha)
    if (!senhaMatch) return res.status(401).json({ error: 'Senha inválida' })

    // Remove todos os tokens antigos do usuário
    await Token.delete(
      { user: { id: user.id } }
    )

    const token = new Token()
    // Gera um token aleatório
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    // Define a data de expiração do token para 1 hora
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    // Gera um refresh token aleatório
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)

    token.user = user
    await token.save()

    // Adiciona o token em um cookie
    res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' }) // Aqui estamos definindo o cookie como HTTP Only, Secure e SameSite None
    return res.json({
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }

  static async refresh (req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) return res.status(400).json({ error: 'O refresh token é obrigatório' })

    const token = await Token.findOneBy({ refreshToken: authorization })
    if (!token) return res.status(401).json({ error: 'Refresh token inválido' })

    // Verifica se o refresh token ainda é válido
    if (token.expiresAt < new Date()) {
      await token.remove()
      return res.status(401).json({ error: 'Refresh token expirado' })
    }

    // Atualiza os tokens
    token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
    token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
    await token.save()

    // Adiciona o token em um cookie
    res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' }) // Aqui estamos definindo o cookie como HTTP Only, Secure e SameSite None
    return res.json({
      token: token.token,
      expiresAt: token.expiresAt,
      refreshToken: token.refreshToken
    })
  }

  static async logout (req: Request, res: Response) {
    const { authorization } = req.headers
    
    if (!authorization) return res.status(400).json({ error: 'O token é obrigatório' })

    // Verifica se o token existe
    const userToken = await Token.findOneBy({ token: authorization })
    if (!userToken) return res.status(401).json({ error: 'Token inválido' })

    // Remove o token
    await userToken.remove()

    // Remove o cookie
    res.clearCookie('token')

    // Retorna uma resposta vazia
    return res.status(204).json()
  }

  static async subscribeNewsletter(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'O email é obrigatório' });

    // Verifica se o email já está inscrito
    const userCheck = await User.findOneBy({ email })
    if (userCheck) return res.status(400).json({ error: 'Email já cadastrado' })

    const newsletter = new Newsletter();
    newsletter.email = email;
    await newsletter.save();

    return res.status(201).json({ message: 'Inscrição realizada com sucesso' });
  }
}