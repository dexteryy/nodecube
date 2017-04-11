
import jwtMiddleware from 'express-jwt';

export default function authorization({
  jwtSecret,
  credentialsRequired = true,
  queryTokenName = 'token',
  getToken,
  publicPath = [],
  unauthorizedMessage = 'INVALID TOKEN',
}) {

  function fromHeaderOrQuery(req) {
    const {
      headers: {
        authorization,
      },
      query: {
        [queryTokenName]: token,
      },
    } = req;
    const authHeader = authorization ? authorization.split(' ') : [];
    if (authHeader[0] === 'Bearer') {
      return authHeader[1];
    } else if (token) {
      return token;
    }
    return null;
  }

  return {

    authorized: jwtMiddleware({
      secret: jwtSecret,
      credentialsRequired,
      getToken: getToken || fromHeaderOrQuery,
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
