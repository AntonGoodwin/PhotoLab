import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { statisticService } from "../services/statistic";

const schema = Joi.array().items(
  Joi.object().keys({
    n: Joi.string().min(1).required(),
    u: Joi.string().uri().required(),
    t: Joi.string().min(1).required(),
    ts: Joi.number().required(),
    tg: Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
  }),
);

export class StatisticController {
  public async getTopWritersStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const chatId = Number(req.params.chatId);

      if (Number.isNaN(chatId)) {
        return next(new Error("Invalid chat ID"));
      }
      const top = req.query.top ? Number(req.query.top) : 10;
      const stat = await statisticService.getTopWritersStatistic(chatId, top);
      res.status(200).json(stat);
    } catch (error) {
      next(error);
    }
  }
}

export const statisticController = new StatisticController();
