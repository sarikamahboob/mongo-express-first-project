import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

router.post('/create-student', UserControllers.createStudent)


export const UserRoutes = router
