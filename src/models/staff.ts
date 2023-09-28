import { conn } from "../db";
import {
    DataTypes,
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyAddAssociationMixin,
  } from "sequelize";

import {Case} from "./case";

class Staff extends Model< InferAttributes<Staff>,
  InferCreationAttributes<Staff>
> {
    declare staffId: CreationOptional<number>;
    declare staffName: string;

    
    declare cases?: Case[];

    declare getCases: HasManyGetAssociationsMixin<Case[]>;
    declare setCases: HasManySetAssociationsMixin<Case[], number>;
    declare addCases: HasManyAddAssociationMixin<Case, number>;


}

Staff.init (
  {
    staffId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    } ,
    staffName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: "updateTimestamp",
    sequelize: conn, // We need to pass the connection instance
    modelName: "staff", // We need to choose the model name
  },
)

export {Staff};