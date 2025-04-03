import { Request, Response } from "express";
import { errorCode, responseCode } from "../types/types";

type ApiResponse =
  | {
      type: "response" | "info";
      responseCode: responseCode;
      data: Record<string, any> | string;
    }
  | {
      type: "error";
      errorCode: errorCode;
      errorMessage: string;
    };

type SuccessResponse = (
  req: Request,
  res: Response,
  responseCode: responseCode,
  data: Record<string, any> | string,
  statusCode?: number
) => void;

type ErrorResponse = (
  req: Request,
  res: Response,
  errorCode: errorCode,
  errorMessage: string,
  statusCode?: number
) => void;

const errorCodeToStatusCode: Record<errorCode, number> = {
  "forbidden": 403,
  "unauthorized": 401,
  "exists": 409,
  "server-error": 500,
  "invalid-data": 400,
  "not-found": 404,
};

const responseCodeToStatusCode: Record<responseCode, number> = {
  "created": 201,
  "updated": 200,
  "fetched": 200,
  "deleted": 204,
};

function getStatusErrorCode(error: errorCode): number {
  return errorCodeToStatusCode[error];
}

function getResponseStatusCode(response: responseCode): number {
  return responseCodeToStatusCode[response];
}

export const success: SuccessResponse = (req, res, responseCode, data) => {
  const response: ApiResponse = {
    type: "response",
    responseCode: responseCode,
    data: data,
  };
  console.log(`[response message:] ${response}`);
  res.status(getResponseStatusCode(responseCode)).send(response);
};

export const error: ErrorResponse = (req, res, errorCode, errorMessage) => {
  const response: ApiResponse = {
    type: "error",
    errorCode: errorCode,
    errorMessage: errorMessage,
  };
  console.error(`[response error:] ${response}`);
  res.status(getStatusErrorCode(errorCode)).send(response);
};
