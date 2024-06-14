import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middleware'
import ChecklistController from '../../controllers/checklist/checklist.controller'

const checklistRoutes = Router()

checklistRoutes.post('/', authMiddleware, ChecklistController.store)
checklistRoutes.get('/', authMiddleware, ChecklistController.index)
checklistRoutes.get('/:id', authMiddleware, ChecklistController.show)
checklistRoutes.delete('/:id', authMiddleware, ChecklistController.delete)
checklistRoutes.put('/:id', authMiddleware, ChecklistController.update)

export default checklistRoutes
