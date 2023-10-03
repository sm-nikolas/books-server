import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await dbConnect();

connection.on("error", (error) =>
  console.error(`Erro ao se conectar ao banco de dados!\n erro: ${error}`)
);

connection.once("open", () => console.log("Conectado ao banco de dados!"));

const app = express();
routes(app);

export default app;
