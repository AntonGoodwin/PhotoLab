import sequelize from "../models";
import { QueryTypes } from "sequelize";
import { TopWritersStatistic } from "../dto/top_writers_statistic";

const topWritersStatisticQuery = `
WITH RECURSIVE consecutive_days AS (
    SELECT
        m.id AS user_id,
        CURRENT_DATE() AS current_day,
        1 AS streak,
        COUNT(u.id) AS counter
    FROM bot.members as m
    LEFT JOIN bot.updates as u ON u.user_id = m.id
    WHERE u.user_id = m.id AND DATE(u.createdAt) = CURRENT_DATE() AND u.chat_id = :chatId AND m.is_bot = 0
    GROUP BY m.id, current_day, streak

    UNION ALL

    SELECT
        c.user_id,
        DATE_SUB(c.current_day, INTERVAL 1 DAY) AS current_day,
        c.streak + 1 AS streak,
        0 AS counter
    FROM consecutive_days as c
    WHERE EXISTS (
        SELECT 1
        FROM bot.updates as u
        WHERE u.user_id = c.user_id AND DATE(u.createdAt) = DATE_SUB(c.current_day, INTERVAL 1 DAY)
    )
)

SELECT
    m.id AS user_id,
    m.first_name,
    m.last_name,
    m.username,
    MAX(c.streak) AS posting_streak,
    MAX(c.counter) AS today_counter
FROM bot.members as m
LEFT JOIN consecutive_days c ON m.id = c.user_id
WHERE  c.streak IS NOT NULL
GROUP BY
	m.id,
    m.first_name,
    m.last_name,
    m.username
ORDER BY posting_streak DESC, today_counter DESC
LIMIT :top;
`;

export class StatisticService {
  public async getTopWritersStatistic(chatId: number, top: number): Promise<TopWritersStatistic[]> {
    const topWriters = await sequelize.query<TopWritersStatistic>(
      topWritersStatisticQuery,
      { replacements: { top, chatId }, type: QueryTypes.SELECT }
    );
    return topWriters;
  }
}

export const statisticService = new StatisticService();
