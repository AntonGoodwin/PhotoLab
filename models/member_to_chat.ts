'use strict';
import { DataTypes, Model, Sequelize } from "sequelize";

export class MemberToChat extends Model {
  user_id: number;
  chat_id: number;
}

export const init = (sequelize: Sequelize) => {
  MemberToChat.init({
    user_id: DataTypes.BIGINT,
    chat_id: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'MemberToChat',
    tableName: 'member_to_chat'
  });
}
