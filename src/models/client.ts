import { conn } from "../db";
import {
    DataTypes,
    Model,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyAddAssociationMixin
  } from "sequelize";
import {Case} from "./case";


class Client extends Model< InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
    declare clientId: CreationOptional<number>;
    declare clientName: string;
    declare clientBirthdate: Date;
    declare clientAddress: string;
    declare company: string;

    declare cases?: Case[];

    declare getCases: HasManyGetAssociationsMixin<Case[]>;
    declare setCases: HasManySetAssociationsMixin<Case[], number>;
    declare addCases: HasManyAddAssociationMixin<Case, number>;
}

Client.init (
  {
    clientId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    clientBirthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clientAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
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
    modelName: "client", // We need to choose the model name
  },
)

export {Client};