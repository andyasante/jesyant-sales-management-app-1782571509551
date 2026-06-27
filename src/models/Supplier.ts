```typescript
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Supplier extends Model {
  public id!: number;
  public name!: string;
  public contactNumber!: string;
  public email!: string;
  public address!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Supplier.init(
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
    contactNumber: {
      type: new DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'suppliers',
    timestamps: true,
  }
);

export default Supplier;
```