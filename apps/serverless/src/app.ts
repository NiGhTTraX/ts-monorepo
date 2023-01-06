import { meaningOfLife } from "@nighttrax/foo";
import express, { Express } from "express";

const app: Express = express();

app.get("/", (_, res) => {
  res.header("Content-Type", "application/json; charset=utf-8").json({
    meaningOfLife,
  });
});

export { app };
