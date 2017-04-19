
import Redis from 'ioredis';

const isProductionEnv = process.env.NODE_ENV === 'production';

export default function redis({
  host,
  port,
  db = 0,
  password,
}) {
  const config = {
    host: host || !isProductionEnv && 'redis' || '',
    port: port || !isProductionEnv && '6379' || '',
    db,
  };
  if (password) {
    config.password = password;
  }
  return new Redis(config);
}
