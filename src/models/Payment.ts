```typescript
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Order } from './Order';

export class Payment extends Model {
  public id!: number;
  public amount!: number;
  public method!: string;
  public status!: string;
  public orderId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['cash', 'credit_card', 'mobile_money']],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pending', 'completed', 'failed']],
      },
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'payments',
  }
);

Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
```