import { Telegraf } from 'telegraf'

export class TelegramBot {
  private bot = new Telegraf(process.env.BOT_TOKEN!)

  constructor() {
    this.bot.launch()
  }

  public sendMessage(chatId: number, message: string) {
    this.bot.telegram.sendMessage(chatId, message);
  }

  public stop(signal: string) {
    this.bot.stop(signal);
  }
}

const telegramBot = new TelegramBot();

process.once('SIGINT', () => telegramBot.stop('SIGINT'))
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'))

export default telegramBot;
