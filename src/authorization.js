
import jwtMiddleware from 'express-jwt';

export default function authorization({
  jwtSecret,
  publicPath = [],
  unauthorizedMessage = 'INVALID TOKEN',
}) {

  return {

    authorized: jwtMiddleware({
      secret: jwtSecret,
    }).unless({
      path: publicPath,
    }),

    unauthorized(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send(unauthorizedMessage);
      } else {
        next(err);
      }
    },

  };

}
