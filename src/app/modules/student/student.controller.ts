/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.zod.validation'
// import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // validation using zod
    const zodParseData:any = studentValidationSchema.parse(studentData)

    // validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData)
    // if (error) {
    //    res.status(500).json({
    //      success: false,
    //      message: 'student data is not created!',
    //      error: error.details,
    //    })
    // }

    const result = await StudentServices.createStudentIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'students are fetched successfully',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
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
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'students is deleted successfully',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
  }
}

const updateSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body
    // Partial validation using zod
    const zodParseData: any = studentValidationSchema.partial().parse(studentData);
    const { studentId } = req.params
    const result = await StudentServices.updateSingleStudentFromDB(studentId, zodParseData)
    res.status(200).json({
      success: true,
      message: 'students is updated successfully',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateSingleStudent
}
