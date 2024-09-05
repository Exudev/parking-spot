// src/components/organization/validateOrganization.ts

import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

const validateOrganization = [
  check('name').notEmpty().withMessage('Name is required'),
  check('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordinates error')
    .custom((value) => value.every((num: number) => typeof num === 'number'))
    .withMessage('Coordinates must be numbers'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError('invalid-data' ,'Invalid input',errors.array()));
    }
    next();
  },
];

const validateUser = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').notEmpty().withMessage('Email is required'),
  check('name').notEmpty().withMessage('Name is required'),
  check('lastname').notEmpty().withMessage('Lastname is required'),
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
  validateOrganization,
  validateUser,
};
