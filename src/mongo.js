
import mongoose from 'mongoose';
import qs from 'qs';

const isProductionEnv = process.env.NODE_ENV === 'production';

mongoose.Promise = global.Promise;

export default function mongo({
  node1Host: customNode1Host,
  node1Port: customNode1Port,
  node2Host,
  node2Port,
  dbname: customDbname,
  replset,
  user,
  pass,
}) {
  const node1Host = customNode1Host || !isProductionEnv && 'mongo' || '';
  const node1Port = customNode1Port || !isProductionEnv && '27017' || '';
  const dbname = customDbname || !isProductionEnv && 'test' || '';
  const nodes = [`${node1Host}:${node1Port}`];
  if (node2Host) {
    nodes.push(`${node2Host}:${node2Port}`);
  }
  const opt = {};
  if (replset) {
    opt.replicaSet = replset;
  }
  let optString = qs.stringify(opt);
  if (optString) {
    optString = `?${optString}`;
  }
  const uri = `mongodb://${nodes.join(',')}/${dbname}${optString}`;
  const conn = mongoose.createConnection(uri, {
    user,
    pass,
    server: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000,
      },
    },
    replset: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS : 30000,
      },
    },
  });
  conn.on('connecting', () => {
    logger.info(`[MongoDB Connection] Connecting: ${uri}`);
  });
  conn.on('connected', () => {
    logger.info('[MongoDB Connection] connected');
  });
  conn.on('open', () => {
    logger.info('[MongoDB Connection] opened');
  });
  conn.on('fullsetup', () => {
    logger.info('[MongoDB Connection] one node connected');
  });
  conn.on('all', () => {
    logger.info('[MongoDB Connection] all nodes connected');
  });
  conn.on('error', err => {
    logger.info(`[MongoDB Connection] Error: ${err}`);
  });
  conn.on('disconnecting', () => {
    logger.info('[MongoDB Connection] disconnecting...');
  });
  conn.on('disconnected', () => {
    logger.info('[MongoDB Connection] disconnected');
  });
  conn.on('reconnected', () => {
    logger.info('[MongoDB Connection] reconnected');
  });
  return conn;
}
