import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload:TAcademicSemester) => {
  if(academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!')
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemesterModel.findById(semesterId)
  return result
}

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>
) => {
  const semesterCode: TAcademicSemester | null =
    await AcademicSemesterModel.findById(semesterId)
  // if payload name and code both are wrong
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Name or Code')
  }
  // if payload name is wrong
  if (
    payload.name &&
    !payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== semesterCode?.code
  ) {
    throw new Error('Invalid Semester Name')
  }
  // if payload code is wrong
  const semesterNameByCode = Object.keys(academicSemesterNameCodeMapper).find(
    (key) =>
      academicSemesterNameCodeMapper[
        key as keyof typeof academicSemesterNameCodeMapper
      ] === payload.code,
  )
  if (
    !payload.name &&
    payload.code &&
    semesterNameByCode !== semesterCode?.name
  ) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}