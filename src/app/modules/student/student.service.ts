import { TStudent } from './student.interface'
import { Student } from './student.model'


const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) // built-in static method
  const student = new Student(studentData) // create an instance
  if(await student.isUserExist(studentData.id)) {
    throw new Error(`user already exists`)
  }
  const result = student.save() // built-in instance method
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
