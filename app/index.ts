import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import initializeDb, { DB_CONNECTION } from "./database";
import {  swaggerSpec } from "./utils/swagger.config";
import { client } from "./nextCloud.config";
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(json());
app.use(cors());
app.use(express.static("app/brandLogo"));
app.use(morgan("tiny"));
app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export let server: any;

// Run the server.
function startServer() {
  server = app.listen(port, async() => {
    initializeDb();
    await client.checkConnectivity();
    console.log("connected to next-cloud");
    console.log(
      `${process.env.APP_NAME} app listening on http://localhost:${port}`
    );
  });
  server.setTimeout(500000);
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  await DB_CONNECTION.close();
  server.close(() => {
    console.log("HTTP server closed");
  });
});

if (!server) {
  startServer();
}
