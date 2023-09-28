import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
const path = require("path");
const envPath = path.resolve("../client-management/.env");
require("dotenv").config({ path: envPath }); // For my laptop

const conn = new Sequelize(
  process.env.MYSQL_DB || "client",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: ["TRUE", "true", "True", "1"].includes(process.env.SQL_VERBOSE||"")
  },
);


export { conn };