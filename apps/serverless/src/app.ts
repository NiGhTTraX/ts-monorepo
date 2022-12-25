import { meaningOfLife } from "@nighttrax/foo";
import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.header("Content-Type", "application/json; charset=utf-8").json({
    meaningOfLife,
  });
});

export { app };
