/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Schema, model } from 'mongoose'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: `{VALUE} is not in capitalize format`,
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid`,
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

// const studentSchema = new Schema<Student>({
//   id: { type: String, unique: true, required: true },
//   name: { type: userNameSchema, required: true },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message:
//         "{VALUE} is not valid. The gender field can only be of the following: 'male', 'female', 'other'",
//     },
//     required: true,
//   },
//   dateOfBirth: { type: String },
//   email: {
//     type: String,
//     required: true,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: '{VALUE} is not a valid email',
//     }
//   },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: { type: String, required: true },
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B+', 'O+', 'O-'],
//   },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   guardian: { type: guardianSchema, required: true },
//   localGuardian: { type: localGuardianSchema, required: true },
//   profileImage: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// })

// export const StudentModel = model<Student>('Student', studentSchema)

/***creating a custom instance method ***/

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
//   id: { type: String, unique: true, required: true },
//   name: { type: userNameSchema, required: true },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message:
//         "{VALUE} is not valid. The gender field can only be of the following: 'male', 'female', 'other'",
//     },
//     required: true,
//   },
//   dateOfBirth: { type: String },
//   email: {
//     type: String,
//     required: true,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: '{VALUE} is not a valid email',
//     }
//   },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: { type: String, required: true },
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B+', 'O+', 'O-'],
//   },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   guardian: { type: guardianSchema, required: true },
//   localGuardian: { type: localGuardianSchema, required: true },
//   profileImage: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// })

// studentSchema.methods.isUserExist = async (id: string) => {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }
// export const Student = model<TStudent, StudentModel>('Student', studentSchema)

/***creating a custom static method ***/
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, unique: true, required: [true, 'ID is required'] },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid. The gender field can only be of the following: 'male', 'female', 'other'",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B+', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

/*** mongoose virtual ***/ 
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
})

/*** document middleware ***/ 
// pre save middleware/hook
// will work on create() and save()
// studentSchema.pre('save', async function(next) {
//   // hashing password and save into database
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this
//   user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
//   next()
// })

// // post save middleware/hook
// studentSchema.post('save', function(doc,next) {
//   doc.password = ''
//   next()
// })

/*** query middleware ***/
studentSchema.pre('find', function(next) {
  // @ts-ignore
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function(next) {
  // @ts-ignore
  this.find({ isDeleted: { $ne: true } })
  next()
})

// [ {$match:{isDeleted: {$ne: true}}}, {$match:{id: '123456'}} ]

studentSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
})


studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)