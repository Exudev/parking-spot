// src/components/organization/validateOrganization.ts

import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

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