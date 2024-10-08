import { model, Schema } from "mongoose";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
}, {
  timestamps: true
})

academicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new AppError(httpStatus.CONFLICT, 'Semester is already exists!')
  }
  next()
})

export const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)