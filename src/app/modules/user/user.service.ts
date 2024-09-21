import mongoose from "mongoose"
import config from "../../config"
import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"
import { generateStudentId } from "./user.utils"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"

// const createStudentIntoDB = async (password: string, studentData: TStudent) => {
//   // if (await Student.isUserExist(studentData.id)) {
//   //   throw new Error(`user already exists`)
//   // }
//   // const result = await UserModel.create(studentData) // built-in static method
//   // const student = new Student(studentData) // create an instance
//   // if(await student.isUserExist(studentData.id)) {
//   //   throw new Error(`user already exists`)
//   // }
//   // const result = student.save() // built-in instance method

//   const result = await UserModel.create(studentData)
//   return result
// }

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData:Partial<TUser> = {}
  // if password is not given, use default password
  userData.password = password || config.default_pass as string
  // set student role
  userData.role = 'student';
  // find academic semester info 
  const admissionSemester: TAcademicSemester | null = await AcademicSemesterModel.findById(payload.admissionSemester)

  const session = await mongoose.startSession()
  
  try {
    session.startTransaction()
    // set manually generated id
    userData.id = await generateStudentId(admissionSemester!)

    // create a user (transaction-1)
    // for transacton we have to give data as an array
    const newUser = await UserModel.create([userData], { session }) // array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id //embedding id
    payload.user = newUser[0]._id // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDB
}