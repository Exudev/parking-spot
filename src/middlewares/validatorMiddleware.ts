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
      return next(new ValidationError('Invalid input', errors.array()));
    }
    next();
  },
];

export default validateOrganization;
