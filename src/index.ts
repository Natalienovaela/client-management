import express, { Express, Request, Response , Application } from 'express';
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import * as dotenv from 'dotenv';
import { conn } from "./db";
import cors from "cors";

import { seedDatabase, createDatabase } from "./models/index";

const path = require("path");
const envPath = path.resolve("../client-management/.env");
require("dotenv").config({ path: envPath });

//For env File 
const truthy = ["TRUE", "true", "True", "1"];
const app = express();
app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = 3000;

server.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}/`);
  await conn.authenticate();
  console.log("Database connected!");

  if (truthy.includes(process.env.RESET_DB || "")) {
    await createDatabase({ forced: true });
    console.log("Database built!");
    await seedDatabase();
    console.log("Database seeded!");
  } else {
    await createDatabase({forced: false});
    console.log("Database left untouched!");
  }
});


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//app.use("/api/employee/", employeeRoutes);

