import express, { json } from "express";
import "../modules/clients/routes";
import { routes } from "./routes";
import { AppDataSource } from "./database";
import cors from "cors";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(json());
app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization", error)
  );

export { app };
