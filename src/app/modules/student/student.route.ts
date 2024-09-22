import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { updateStudentValidationSchema } from './student.zod.validation'

const router = express.Router()

router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
)

export const StudentRoutes = router
