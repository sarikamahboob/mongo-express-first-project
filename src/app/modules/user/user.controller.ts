import { Request, Response } from "express"
import {  UserServices } from "./user.service"

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const {password, student: studentData } = req.body
//     // validation using zod
//     const zodParseData = studentValidationSchema.parse(studentData)

//     // validation using joi
//     // const { error, value } = studentValidationSchema.validate(studentData)
//     // if (error) {
//     //    res.status(500).json({
//     //      success: false,
//     //      message: 'student data is not created!',
//     //      error: error.details,
//     //    })
//     // }

//     const result = await StudentServices.createStudentIntoDB(zodParseData)
//     res.status(200).json({
//       success: true,
//       message: 'student is created successfully',
//       data: result,
//     })
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error?.message || 'student data is not created!',
//       error: error,
//     })
//   }
// }

const createStudent = async (req: Request, res: Response) => {
  try {
    const {password, student: studentData } = req.body
    // validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password,studentData )
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

export const UserControllers = {
  createStudent
}