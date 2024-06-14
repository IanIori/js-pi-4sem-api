import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import cargoRoutes from './cargo/cargo.routes'
import checklistRoutes from './checklist/checklist.routes'

const routes = Router()

routes.use('/carga', cargoRoutes)
routes.use('/auth', authRoutes)
routes.use('/checklists', checklistRoutes)

export default routes