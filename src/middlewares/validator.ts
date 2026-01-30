import { Request, Response, NextFunction, RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { CustomError } from "../utils/custom-error";

function validationMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);

    const errors: ValidationError[] = await validate(dtoObj, {
      skipMissingProperties,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .join(", ");

      next(CustomError.BadRequest(message));
    } else {
      req.body = dtoObj;
      next();
    }
  };
}

export default validationMiddleware;
