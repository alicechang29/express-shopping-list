import { UnauthorizedError } from "./expressError.js";



/** Logger: prints log message and goes to next. */

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
// end logger




export { logger };