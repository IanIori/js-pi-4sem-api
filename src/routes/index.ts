import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import cargoRoutes from './cargo/cargo.routes'

const routes = Router()

routes.use('/cargo', cargoRoutes)
routes.use('/auth', authRoutes)

export default routes