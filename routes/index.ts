import express from "express";
import { statisticController } from "../controllers/statistic";
const router = express.Router();

/* GET home page. */
router.get('/top-writers/:chatId', statisticController.getTopWritersStatistic);

export default router;
