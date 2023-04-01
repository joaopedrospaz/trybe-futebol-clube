import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>> {
  declare id: number;
  declare teamName: string;
}

Teams.init({
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

export default Teams;
