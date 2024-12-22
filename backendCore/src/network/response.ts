import { Request, Response } from 'express';
import { errorCode, responseCode } from '../types/types';

type ApiResponse =
    | {
        type: "response" | "info";
        responseCode: responseCode;
        data:  Record<string,any> | string;
    }
    | {
        type: "error";
        errorCode: errorCode;
        errorMessage: string;
    };

type SuccessResponse = (req: Request, res: Response, responseCode: responseCode, data: Record<string,any> | string,  statusCode?: number) => void;
type ErrorResponse = (req: Request, res: Response, errorCode: errorCode, errorMessage: string, statusCode?: number) => void;

export const success: SuccessResponse = (req, res, responseCode, data, statusCode = 200) => {
    console.log(`[response message:] ${data}`);
    const response: ApiResponse = {
        type: 'response',
        responseCode: responseCode,
        data: data,
    };
    res.status(statusCode).send(response);
};

export const error: ErrorResponse = (req, res, errorCode, errorMessage, statusCode = 500) => {
    console.error(`[response error:] ${errorMessage}`);
    const response: ApiResponse = {
        type: 'error',
        errorCode: errorCode,
        errorMessage: errorMessage,
    };
    res.status(statusCode ).send(response);
};
