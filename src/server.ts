import "reflect-metadata";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";

import "./database";
import { HTTPError } from "./utilities/HTTPErrors";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof HTTPError) {
      return response.status(err.code).json({ error: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running...");
});
