import { DataTypes, InferAttributes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model<InferAttributes<Matches>> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'matches',
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'id' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'id' });

export default Matches;