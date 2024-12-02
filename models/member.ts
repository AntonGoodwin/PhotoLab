'use strict';
import { DataTypes, Model, Sequelize } from "sequelize";

export class Member extends Model {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  is_bot: boolean
}

export const init = (sequelize: Sequelize) => {
  Member.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    is_bot: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Member',
    tableName: 'members'
  });
}
