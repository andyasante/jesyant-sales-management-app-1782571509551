```typescript
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Product } from './Product';
import { Customer } from './Customer';

interface OrderAttributes {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'orderDate' | 'status'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public customerId!: number;
  public productId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public orderDate!: Date;
  public status!: 'pending' | 'completed' | 'cancelled';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'orders',
  }
);

Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export { Order };
```