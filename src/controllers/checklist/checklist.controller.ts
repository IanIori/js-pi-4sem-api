import { Request, Response } from 'express'
import Checklist from '../../models/checklist.entity'
import User from '../../models/user.entity'
import Cargo from '../../models/cargo.entity'
import Attachment from '../../models/attachment.entity'

export default class ChecklistController {
  static async store (req: Request, res: Response) {
    const { driverName, factory, departureDate, arrivalDate, truckPlate, transportCompany, painting, glasses, observations, attachments, cargaId } = req.body
    const { userId } = req.headers
    
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    if (!driverName || !factory || !departureDate || !arrivalDate || !truckPlate || !transportCompany || !painting || !glasses || !observations || !cargaId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    const user = await User.findOneBy({ id: Number(userId) })
    const carga = await Cargo.findOneBy({ id: Number(cargaId) })

    if (!user || !carga) return res.status(400).json({ error: 'Usuário ou carga inválidos' })

    const checklist = new Checklist()
    checklist.driverName = driverName
    checklist.factory = factory
    checklist.departureDate = new Date(departureDate)
    checklist.arrivalDate = new Date(arrivalDate)
    checklist.truckPlate = truckPlate
    checklist.transportCompany = transportCompany
    checklist.painting = painting
    checklist.glasses = glasses
    checklist.observations = observations
    checklist.carga = carga
    checklist.driver = user

    if (attachments && attachments.length > 0) {
      checklist.attachments = attachments.map((attachment: any) => {
        const newAttachment = new Attachment()
        newAttachment.filename = attachment.filename
        newAttachment.data = Buffer.from(attachment.data, 'base64')
        return newAttachment
      })
    }

    await checklist.save()
    return res.status(201).json(checklist)
  }

  static async index (req: Request, res: Response) {
    const { userId } = req.headers

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const checklists = await Checklist.find({
      where: { driver: { id: Number(userId) } },
      relations: ['carga', 'attachments']
    })
    return res.json(checklists)
  }

  static async show (req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const checklist = await Checklist.findOne({
      where: { id: Number(id), driver: { id: Number(userId) } },
      relations: ['carga', 'attachments']
    })
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' })
    }

    return res.json(checklist)
  }

  static async delete (req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req.headers

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const checklist = await Checklist.findOne({
      where: { id: Number(id), driver: { id: Number(userId) } },
      relations: ['carga', 'attachments']
    })
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' })
    }

    await checklist.remove()
    return res.status(204).json()
  }

  static async update (req: Request, res: Response) {
    const { id } = req.params
    const { driverName, factory, departureDate, arrivalDate, truckPlate, transportCompany, painting, glasses, observations, attachments } = req.body
    const { userId } = req.headers

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const checklist = await Checklist.findOne({
      where: { id: Number(id), driver: { id: Number(userId) } },
      relations: ['carga', 'attachments']
    })
    if (!checklist) {
      return res.status(404).json({ error: 'Checklist não encontrado' })
    }

    checklist.driverName = driverName ?? checklist.driverName
    checklist.factory = factory ?? checklist.factory
    checklist.departureDate = departureDate ? new Date(departureDate) : checklist.departureDate
    checklist.arrivalDate = arrivalDate ? new Date(arrivalDate) : checklist.arrivalDate
    checklist.truckPlate = truckPlate ?? checklist.truckPlate
    checklist.transportCompany = transportCompany ?? checklist.transportCompany
    checklist.painting = painting ?? checklist.painting
    checklist.glasses = glasses ?? checklist.glasses
    checklist.observations = observations ?? checklist.observations

    if (attachments && attachments.length > 0) {
      checklist.attachments = attachments.map((attachment: any) => {
        const newAttachment = new Attachment()
        newAttachment.filename = attachment.filename
        newAttachment.data = Buffer.from(attachment.data, 'base64')
        return newAttachment
      })
    }

    await checklist.save()
    return res.json(checklist)
  }
}
