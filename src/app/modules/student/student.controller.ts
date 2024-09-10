import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation'

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'students are fetched successfully',
      data: result,
    })
  } catch (error) {
    console.log('error in fetching students', error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'students is retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log('error in retrieving students', error)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
}
