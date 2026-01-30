import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env";
import { IRequest } from "./request";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "./responses";

export const generateAccessToken = async (id: string): Promise<string> => {
  let token = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return ResponseHandler.errorResponse(res, `Unauthorized`, 401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, token) => {
      if (err) return ResponseHandler.errorResponse(res, `Forbidden`, 403);

      const { id } = token as JwtPayload;

      // req.user = { id };
      next();
    });
  } catch (error) {
    next(error);
  }
};
