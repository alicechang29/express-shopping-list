import { NotFoundError } from "./expressError.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));

import items from "./routes/items.js";
import { logger } from "./middleware.js";

app.use(express.json());

app.use(logger); // NOTE: Logger is an imported middleware function

// apply prefix to every route
app.use("/items", items);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

export default app;