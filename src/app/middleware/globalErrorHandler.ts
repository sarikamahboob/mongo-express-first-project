/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

const globalErrorHandler = (err: any, req:Request, res: Response, next: NextFunction) => {
  const statusCode:any = 500
  const message = 'something went wrong!'
  return res.status(statusCode).json({ 
    success: false,
    message,
    error: err.message || err
  })
}

export default globalErrorHandler