import { Request } from "express";

export interface AuthPayload {
  id: string;
}

export interface IRequest<
  TBody = any,
  TQuery = any,
  TParams = any,
> extends Request<TParams, any, TBody, TQuery> {
  user?: AuthPayload;
}
