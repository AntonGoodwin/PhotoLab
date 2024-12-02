'use strict';
import { DataTypes, fn, Model, Sequelize } from "sequelize";
import { Message } from "telegraf/typings/core/types/typegram";

export class Update extends Model {
  id: number;
  chat_id: number;
  user_id: number;
  payload: Message;
  created_at: Date;
}

export const init = (sequelize: Sequelize) => {
  Update.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    payload: DataTypes.JSON,
    created_at: {
      type: DataTypes.DATE,
      field: 'createdAt',
      allowNull: false,
      defaultValue: fn("NOW"),
    }
  }, {
    sequelize,
    modelName: 'Update',
    tableName: 'updates'
  });
}
