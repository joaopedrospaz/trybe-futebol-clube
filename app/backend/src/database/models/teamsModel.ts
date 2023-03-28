import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';

class teams extends Model<InferAttributes<teams>> {
  declare id: number;
  declare teamName: string;
}

teams.init({
  id: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
});
