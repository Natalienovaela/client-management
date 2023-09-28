import { conn } from "../db";
import {CaseType} from "./enumerated";
import {
    DataTypes,
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin
  } from "sequelize";

import {Staff} from "./staff";
import {Client} from "./client";

class Case extends Model< InferAttributes<Case>,
  InferCreationAttributes<Case>
> {
    declare caseId: CreationOptional<number>;
    declare caseProgress: CaseType;
    declare caseCreationDate: Date;
    declare caseMessage: string;

    declare getStaff: BelongsToGetAssociationMixin<Staff>;
    declare setStaff: BelongsToSetAssociationMixin<Staff, number>;

    declare getClient: BelongsToGetAssociationMixin<Client>;
    declare setClient: BelongsToSetAssociationMixin<Client, number>;



}

Case.init (
  {
    caseId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    caseProgress: {
      type: DataTypes.ENUM,
      values: Object.values(CaseType),
      allowNull: false,
    }, 
    caseCreationDate: {
      type: DataTypes.DATE
    },
    caseMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: "updateTimestamp",
    sequelize: conn, // We need to pass the connection instance
    modelName: "case", // We need to choose the model name
  },
)

export {Case};