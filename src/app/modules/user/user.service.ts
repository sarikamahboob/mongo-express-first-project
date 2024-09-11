import config from "../../config"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"

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

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData:Partial<TUser> = {}
  // if password is not given, use default password
  userData.password = password || config.default_pass as string
  // set student role
  userData.role = 'student';
  // set manually generated id
  userData.id = '2030100001'
  // create a user
  const newUser = await UserModel.create(userData)
  // create a student
  if(Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id //embedding id 
    studentData.user = newUser._id // reference _id 

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB
}