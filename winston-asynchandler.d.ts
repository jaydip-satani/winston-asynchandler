declare module "winston-asynchandler" {
  import { Request, Response, NextFunction } from "express";
  import { Logger } from "winston";

  export class ApiError extends Error {
    statusCode: number;
    message: string;
    errors: any[];
    success: false;

    constructor(
      statusCode: number,
      message?: string,
      errors?: any[],
      stack?: string
    );

    toJSON(): {
      statusCode: number;
      message: string;
      errors: any[];
      success: false;
      stack?: string;
    };
  }

  export class ApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data?: any;

    constructor(statusCode: number, message: string, data?: any);

    toJSON(): {
      statusCode: number;
      message: string;
      success: boolean;
      data?: any;
    };
  }

  export interface AsyncHandlerOptions {
    logger?: {
      error: (message: string, meta?: Record<string, any>) => void;
    };
    formatError?: (err: Error, req: Request) => Record<string, any>;
  }

  export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
    options?: AsyncHandlerOptions
  ): (req: Request, res: Response, next: NextFunction) => Promise<void>;

  export const logger: Logger;
}
