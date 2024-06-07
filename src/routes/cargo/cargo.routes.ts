import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middleware'
import CargoController from '../../controllers/cargo/cargo.controller'

const cargoRoutes = Router()

cargoRoutes.post('/', authMiddleware, CargoController.store)
cargoRoutes.get('/', authMiddleware, CargoController.index)
cargoRoutes.get('/:id', authMiddleware, CargoController.show)
cargoRoutes.delete('/:id', authMiddleware, CargoController.delete)
cargoRoutes.put('/:id', authMiddleware, CargoController.update)

export default cargoRoutes