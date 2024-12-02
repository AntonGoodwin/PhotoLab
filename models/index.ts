import { Sequelize } from "sequelize";
import * as Member from "./member";
import * as Chat from "./chat";
import * as Update from "./update";
import * as MemberToChat from "./member_to_chat";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

Member.init(sequelize);
Chat.init(sequelize);
Update.init(sequelize);
MemberToChat.init(sequelize);

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

export default sequelize;
