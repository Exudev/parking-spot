// src/components/organization/validateOrganization.ts

import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';
import z from "zod";

// TODO:  change to zod

const validateCreateOrganization = [
  check('organization.organizationId').notEmpty().withMessage('Organization ID is required'),
  check('organization.name').notEmpty().withMessage('Name is required'),
  check('organization.location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates error')
    .custom((value) => value.every((num: number) => typeof num === 'number'))
    .withMessage('Coordinates must be numbers'),
    check('user.email').notEmpty().withMessage('Email is required'),
    check('user.username').notEmpty().withMessage('Username is required'),
    check('user.name').notEmpty().withMessage('Name is required'),
    check('user.lastName').notEmpty().withMessage('Lastname is required'),
    check('user.userType').notEmpty().withMessage('User Type is required'),
    check('user.password').notEmpty().withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError('invalid-data' ,'Invalid input',errors.array()));
    }
    next();
  },
];


const createOrganizationRequestSchema = z.object({
  organization: z.object({
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
     settings: z.object({
        owner: z.string().min(1).max(255),
     }),   
  }),
  user: z.object({
    email:z.string().min(1).max(255),
    username:z.string().min(1).max(255),
    name:z.string().min(1).max(25),
    lastname: z.string().min(1).max(25),
    userType: z.enum(["user","owner","moderator","admin"]),
    password: z.string(),
   confirmPassword: z.string(),

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
  validateCreateOrganization as validateOrganization,
  validateUser,
};
validateCreateOrganization