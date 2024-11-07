import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import "./@types/express";

import routerUser from "./routes/user";
import routerClient from "./routes/client";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/", routerUser);
app.use("/", routerClient);

app.use(errorHandler);

export default app;
