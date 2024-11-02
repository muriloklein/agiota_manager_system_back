import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

import routerUser from "./routes/user";
import routerClient from "./routes/client";
import routerBill from "./routes/bill";
import routerPayment from "./routes/payment";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/", routerUser);
app.use("/", routerClient);
app.use("/", routerPayment);
app.use("/", routerBill);

app.use(errorHandler);

export default app;
