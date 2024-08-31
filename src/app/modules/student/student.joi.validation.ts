import Joi from "joi"

// Joi schema for validating UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, 'capitalize format')
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.name': '{#label} is not in capitalize format',
    }),
  middleName: Joi.string().allow(null, ''), // Optional field
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/, 'alphabet only')
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.name':
        '{#label} is not valid, only alphabetic characters are allowed',
    }),
})

// Joi schema for validating Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother contact number is required',
  }),
})

// Joi schema for validating Local Guardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local guardian address is required',
  }),
})

// Joi schema for validating the Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only':
      '{#label} is not valid. The gender field can only be "male", "female", or "other"',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().isoDate().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email is not valid',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .messages({
      'any.only': '{#label} must be a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#label} must be either "active" or "blocked"',
  }),
})

export default studentValidationSchema
