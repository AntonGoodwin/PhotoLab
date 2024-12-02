import telegramBot from "../client/telegram_bot";
import { TopWritersStatistic } from "../dto/top_writers_statistic";
import { Chat } from "../models/chat";
import { statisticService } from "./statistic";

export class BotService {
  private getMemberName = (stat: TopWritersStatistic) => {
    if (stat.first_name && stat.last_name) {
      return `${stat.first_name} ${stat.last_name}`;
    } else if (stat.first_name) {
      return stat.first_name;
    } else if (stat.last_name) {
      return stat.last_name;
    } else if (stat.username) {
      return stat.username;
    }
  }

  public async sendStatistic(): Promise<void> {
    const chats = await Chat.findAll();

    await Promise.all(chats.map(async (chat) => {
      const topStatistic = await statisticService.getTopWritersStatistic(chat.id, 10);
      telegramBot.sendMessage(
        chat.id, 
        `Daily TOP10 writers:\n${topStatistic.map((writer) => `${this.getMemberName(writer)} / Days posting ${writer.posting_streak} / Today posts ${writer.today_counter}`).join('\n')}`
      );
    }))
    
  }
}

export const botService = new BotService();
