import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'staff';
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'admin' | 'staff';
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initialize() {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('admin', 'staff'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}