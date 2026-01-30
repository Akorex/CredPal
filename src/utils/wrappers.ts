import { NextFunction } from "express";
import { CustomError } from "./custom-error";
import { IRequest } from "./request";

export function wrapService<T extends object>(service: T): T {
  return new Proxy(service, {
    get(target, propKey, receiver) {
      const originalValue = Reflect.get(target, propKey, receiver);

      if (typeof originalValue === "function") {
        return async function (this: any, ...args: any[]) {
          try {
            return await originalValue.apply(this, args);
          } catch (error) {
            throw CustomError.wrap(error);
          }
        };
      }

      return originalValue;
    },
  });
}

export function wrapController<T>(controller: T): T {
  const prototype = Object.getPrototypeOf(controller);
  const methodNames = Object.getOwnPropertyNames(prototype);

  methodNames.forEach((methodName) => {
    if (methodName === "constructor") return;

    const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
    if (!descriptor || typeof descriptor.value !== "function") return;

    const originalMethod = descriptor.value;

    (controller as any)[methodName] = async (
      req: IRequest,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        await originalMethod.apply(controller, [req, res, next]);
      } catch (error) {
        next(error);
      }
    };
  });

  return controller;
}
