import { Request, Response } from 'express';
import { errorCode } from '../types/types';


interface ApiResponse {
    error: string;
    body: string;
}


type SuccessResponse = (req: Request, res: Response, message: string, status?: number) => void;
type ErrorResponse = (req: Request, res: Response, errorCode: errorCode, status?: number, errorMessage?: string) => void;

export const success: SuccessResponse = (req, res, message, status = 200) => {
    console.log(`[response meesage:] ${message}`);
    const response: ApiResponse = {
        error: '',
        body: message
    };
    res.status(status).send(response);
};

export const error: ErrorResponse = (req, res, errorCode, status = 500, errorMessage = '') => {
    console.error(`[response error:] ${errorMessage}`);
    const response: ApiResponse = {
        error: errorCode,
        body: ''
    };
    res.status(status).send(response);
};
