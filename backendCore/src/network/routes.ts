import { Router, Request, Response, NextFunction } from 'express';
import organizationRouter from '../services/organization/network';

import userRouter from '../services/user/network';

const routes = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  });

  router.use('/', organizationRouter);
  router.use('/',userRouter )
  router.get('/health',(req,res)=>{
    res.status(200).json({
      status: "healthy"
    })
  } )
  
};

export default routes;
