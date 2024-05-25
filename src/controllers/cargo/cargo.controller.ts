import { Request, Response } from 'express'
import Cargo from '../../models/cargo.entity'

export default class CargoController {
  static async store (req: Request, res: Response) {
    const { specs, weight, status } = req.body
    const { userId } = req.headers

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    if (!specs) {
      return res.status(400).json({ error: 'Especificação da carga é obrigatória' })
    }

    const carga = new Cargo()
    carga.specs = specs
    carga.weight = weight
    carga.status = status
    carga.userId = Number(userId)
    await carga.save()

    return res.status(201).json(carga)
  }

  static async index (req: Request, res: Response) {
    const { userId } = req.headers

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const cargas = await Cargo.find({where: { userId: Number(userId) }})
    return res.json(cargas)
  }

  static async show (req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers

    if(!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const carga = await Cargo.findOneBy({id: Number(id), userId: Number(userId)})
    return res.json(carga)
  }

  static async delete (req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers

    if(!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const carga = await Cargo.findOneBy({id: Number(id), userId: Number(userId)})
    if (!carga) {
      return res.status(404).json({ error: 'Carga não encontrada' })
    }

    await carga.remove()
    return res.status(204).json()
  }
  
  static async update (req: Request, res: Response) {
    const { id } = req.params
    const { specs, weight, status } = req.body
    const { userId } = req.headers

    if(!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const carga = await Cargo.findOneBy({id: Number(id), userId: Number(userId)})
    if (!carga) {
      return res.status(404).json({ error: 'Carga não encontrada' })
    }

    carga.specs = specs ?? carga.specs
    carga.weight = weight ?? carga.weight
    carga.status = status ?? carga.status
    await carga.save()

    return res.json(carga)
  } 
}