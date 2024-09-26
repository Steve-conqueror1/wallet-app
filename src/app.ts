import express from "express";
import dotenv from "dotenv";
import { dataSource } from "./data-source";

import walletRouter from "./routes";

const app = express();

app.use(express.json());
dotenv.config();

app.use(walletRouter);

const PORT = process.env.PORT || 5001;

dataSource
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.log(error);
  });
