import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { AcademicFacultyValidations } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updatecademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

export const AcademicFacultyRoutes = router
