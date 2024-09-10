const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // validation using zod
    const zodParseData = studentValidationSchema.parse(studentData)

    // validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData)
    // if (error) {
    //    res.status(500).json({
    //      success: false,
    //      message: 'student data is not created!',
    //      error: error.details,
    //    })
    // }

    const result = await StudentServices.createStudentIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'student data is not created!',
      error: error,
    })
  }
}
