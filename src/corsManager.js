
import cors from 'cors';
import union from 'lodash/union';

const isProductionEnv = process.env.NODE_ENV === 'production';

const METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];
const HEADERS = ['Link', 'X-API-Version'];

function corsConfig({
  whitelist = [],
  methods = [],
  headers = [],
  skipWhitelist = !isProductionEnv,
  ...options
}) {
  const whitelistSet = new Set(whitelist);
  return Object.assign({
    origin: !skipWhitelist ? (origin, callback) => {
      callback(null, whitelistSet && (
        whitelistSet.has('*') || whitelistSet.has(origin)
      ));
    } : true,
    methods: union(methods, METHODS).join(','),
    exposedHeaders: union(headers, HEADERS),
    credentials: true,
  }, options);
}

export default function corsManager(opt) {
  return (req, res, next) => {
    return cors(corsConfig(opt))(req, res, next);
  };
}

corsManager._testConfig = corsConfig;
