import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import z from "zod";

// TODO: this needs to validate the whole Request not just the body. 



const validateBodyRequest = (schema:z.ZodSchema )=>{
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          errors: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      } else {
        next(error); 
      }
    }
  }
}


export const createOrganizationRequestSchema = z.object({
  user: z.object({
    email:z.string().min(1).max(255),
    username:z.string().min(1).max(255),
    name:z.string().min(1).max(25),
    lastname: z.string().min(1).max(25),
    userType: z.enum(["user","owner","moderator","admin"]),
    password: z.string(),
   confirmPassword: z.string(),

  }),
    organizationId : z.string().min(1).max(40),
    name: z.string().min(3).max(70),
    location: z.object({
     type: z.literal("Point"),
     coordinates: z.array(z.number()).length(2,"expecting coordinates are exactly 2 numbers")
    }),
    locationDelta: z.object({
      type: z.literal("Point"),
      coordinates: z.array(z.number()).length(2,"expecting coordinates are exactly 2 numbers")
     }),
  
}).refine((data)=> data.user.password === data.user.confirmPassword,{
  message: "Passwords do not match",
  path:["confirmPassword"]
});
const validateUser = [
  check('email').notEmpty().withMessage('Email is required'),
  check('username').notEmpty().withMessage('Username is required'),
  check('name').notEmpty().withMessage('Name is required'),
  check('lastName').notEmpty().withMessage('Lastname is required'),
  check('userType').notEmpty().withMessage('User Type is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError('invalid-data', 'Invalid input',errors.array()));
    }
    next();
  },
];


export {
validateBodyRequest
};