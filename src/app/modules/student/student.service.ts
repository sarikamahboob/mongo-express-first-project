import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { UserModel } from '../user/user.model'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  // const result = await Student.aggregate([
  //   { $match: { id: id }}
  // ])
   const result = await Student.findOne({id})
     .populate('admissionSemester')
     .populate({
       path: 'academicDepartment',
       populate: {
         path: 'academicFaculty',
       },
     })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const existingStudent = await Student.findOne({ id })
  if (!existingStudent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist')
  }
  const existingUser = await UserModel.findOne({ id })
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {new: true, session}
    )
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
     if (!deletedUser) {
       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
     }
    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }
}

const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {

  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) { 
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentIntoDB,
}
