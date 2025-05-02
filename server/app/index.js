import { config } from "dotenv";
config({ path: "./.env" });
import express from "express";
import middleware from "./middleware.js";
import routes from "../routes/index.js";
import { notFoundHandler, errorHandler } from "./error.js";

const app = express();

// * middlewares
middleware.forEach((mw) => app.use(mw));

// * routes
app.use(routes);

// * error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
