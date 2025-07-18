// server/middleware/sanitize.js
import mongoSanitize from 'express-mongo-sanitize';

const sanitizeRequest = (req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  if (req.query) {
    for (let key in req.query) {
      req.query[key] = mongoSanitize.sanitize(req.query[key]);
    }
  }

  next();
};

export default sanitizeRequest;
