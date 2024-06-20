import { Router, Request, Response, NextFunction } from 'express';
import organizationRouter from '../components/organization/network';

const routes = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  });

  router.use('/', organizationRouter);
  
  router.get('/pablo', (req: Request, res: Response)=>{
    res.send("MMG");
  } )
};

export default routes;
