'use strict';
import { DataTypes, Model, Sequelize } from "sequelize";

export class Chat extends Model {
  id: number;
  title: string;
}

export const init = (sequelize: Sequelize) => {
  Chat.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats'
  });
}
