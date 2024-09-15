import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation using zod
      // if everything alright will go to the controller
      await schema.parseAsync({
        body: req.body,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateRequest