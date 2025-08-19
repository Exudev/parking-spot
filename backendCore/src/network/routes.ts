import { Router, Request, Response, NextFunction } from "express";
import organizationRouter from "../services/organization/network";

import userRouter from "../services/user/network";
import { APP_ORIGIN } from '../constants/env';

const routes = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", APP_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });
  router.options("*", (req, res) => {
    res.sendStatus(204);
  });
  router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  router.use("/", organizationRouter);
  router.use("/", userRouter);
  router.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
    });
  });
};

export default routes;
