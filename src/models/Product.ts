import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);