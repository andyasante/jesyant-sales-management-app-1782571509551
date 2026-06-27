import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class Sale extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public customerName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
  }
);