import { NextFunction, Request, Response } from "express";
import { statisticService } from "../services/statistic";

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
