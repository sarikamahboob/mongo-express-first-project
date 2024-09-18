import { z } from "zod"

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
})

const updatecademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
})


export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updatecademicFacultyValidationSchema,
}
