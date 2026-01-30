import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";
import { ResponseHandler } from "../utils/responses";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(CustomError.NotFound());
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let message = "Request failed. Try again later";
  let code = 500;
  let detailedMessage = error.message;

  if (error instanceof CustomError) {
    code = error.code;

    if (error.code !== 500) {
      message = error.message;
    } else {
      message = `Internal Server Error`;
    }
  } else if (
    error instanceof SyntaxError ||
    error instanceof ReferenceError ||
    error instanceof TypeError ||
    error instanceof RangeError ||
    error instanceof URIError ||
    error instanceof EvalError
  ) {
    message = error.message;
    code = 400;
  } else if (error instanceof Error) {
    message = error.message;
    code = 422;
  } else {
    console.error("Unhandled Error:", error); // Log unexpected errors
    return next(error); // Pass to default Express error handler
  }

  // Ensure the response is sent only once
  if (!res.headersSent) {
    ResponseHandler.errorResponse(res, message, code);
  }
};
