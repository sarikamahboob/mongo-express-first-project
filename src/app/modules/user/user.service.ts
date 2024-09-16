import config from "../../config"
import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"
import { generateStudentId } from "./user.utils"

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
  const admissionSemester:TAcademicSemester | null = await AcademicSemesterModel.findById(payload.admissionSemester)
  // set manually generated id
  userData.id = await generateStudentId(admissionSemester!) 
  // create a user
  const newUser = await UserModel.create(userData)
  // create a student
  if(Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id //embedding id 
    payload.user = newUser._id // reference _id 

    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB
}