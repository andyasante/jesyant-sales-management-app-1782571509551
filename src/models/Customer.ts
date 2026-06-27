```typescript
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Customer extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phoneNumber!: string;
  public address!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: new DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^[0-9]+$/,
      },
    },
    address: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    tableName: 'customers',
    sequelize,
  }
);

export default Customer;
```