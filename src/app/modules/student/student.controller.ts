/* eslint-disable @typescript-eslint/no-unused-vars */
 
import {  NextFunction, Request,Response, RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentsFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students are fetched successfully',
      data: result,
    })
})

const getSingleStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students is retrieved successfully',
      data: result,
    })
})

const deleteStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students is deleted successfully',
      data: result,
    })
})

const updateSingleStudent = catchAsync(async (req, res, next) => {
    const { student } = req.body
    const { studentId } = req.params
    const result = await StudentServices.updateSingleStudentIntoDB(
      studentId,
      student,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students is updated successfully',
      data: result,
    })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateSingleStudent
}
