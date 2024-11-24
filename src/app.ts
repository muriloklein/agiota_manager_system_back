import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import "./@types/express";

import routerUser from "./routes/user";
import routerClient from "./routes/client";
import routerHealth from "./routes/healthCheck";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/webmob", routerUser);
app.use("/api/webmob", routerClient);
app.use("/api/webmob", routerHealth);

app.use(errorHandler);

export default app;
