import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cron from "node-cron";

dotenv.config();

import "./models";
import { botService } from "./services/bot";
import indexRouter from "./routes/index";


const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  cron.schedule('50 23 * * *', () => {
    botService.sendStatistic();
  });
});

module.exports = app;
