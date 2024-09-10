import { TStudent } from "../student/student.interface"
import { UserModel } from "./user.model"

const createStudentIntoDB = async (studentData: TStudent) => {
  // if (await Student.isUserExist(studentData.id)) {
  //   throw new Error(`user already exists`)
  // }
  // const result = await UserModel.create(studentData) // built-in static method
  // const student = new Student(studentData) // create an instance
  // if(await student.isUserExist(studentData.id)) {
  //   throw new Error(`user already exists`)
  // }
  // const result = student.save() // built-in instance method

  const result = await UserModel.create(studentData)
  return result
}

export const UserService = {
  createStudentIntoDB
}