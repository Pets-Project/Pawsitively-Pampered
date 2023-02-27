import { DataTypes } from "sequelize";

export interface UserInterface {
  id: {
    type: DataTypes.INTEGER;
    allowNull: false;
    primaryKey: true;
    autoIncrement: true;
  };
  name: {
    type: DataTypes.STRING;
    allowNull: false;
    unique: true;
  };
  password: {
    type: DataTypes.STRING;
    allowNull: false;
  };
  role: {
    type: DataTypes.STRING;
    allowNull: false;
  };
  email: {
    type: DataTypes.STRING;
    unique: true;
    validate: {
      isEmail: true;
      len: [8, 14];
    };
  };
}
