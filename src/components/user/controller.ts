import { Request, Response , NextFunction} from 'express';
import { User } from '../../types/types';
const repository = require("./repository");
import { success, error } from '../../network/response';
import { AppError, ValidationError } from '../../utils/errors';


async function createUser(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const user: User = req.body;
        const newUser = await repository.add(user);
        if (newUser) {
          success(req, res, "created" ,"user created successfully", 201);
        } else {
          next(new ValidationError('server-error', 'Failed to create user'));
        }
      } catch (err) {
        console.error('Error creating user:', err);
        next(new AppError(400,'server-error','server-error' ,err));
      }
}

async function deleteUser(req: Request, res: Response, next : NextFunction ): Promise <void>{
  
}

export {
  createUser,
  deleteUser,
  
}

