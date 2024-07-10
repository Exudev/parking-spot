import { Request, Response } from 'express';
import { errorCode, responseCode } from '../types/types';

type ApiResponse =
    | {
        type: "response" | "info";
        responseCode: responseCode;
        response: string;
    }
    | {
        type: "error";
        errorCode: errorCode;
        errorMessage: string;
    };

type SuccessResponse = (req: Request, res: Response, responseCode: responseCode, message: string,  status?: number) => void;
type ErrorResponse = (req: Request, res: Response, errorCode: errorCode, errorMessage: string, status?: number) => void;

export const success: SuccessResponse = (req, res, responseCode, message, status = 200) => {
    console.log(`[response message:] ${message}`);
    const response: ApiResponse = {
        type: 'response',
        responseCode: responseCode,
        response: message,
    };
    res.status(status).send(response);
};

export const error: ErrorResponse = (req, res, errorCode, errorMessage, status = 500) => {
    console.error(`[response error:] ${errorMessage}`);
    const response: ApiResponse = {
        type: 'error',
        errorCode: errorCode,
        errorMessage: errorMessage,
    };
    res.status(status).send(response);
};
