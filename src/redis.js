
import Redis from 'ioredis';

export default function redis({
  host,
  port,
  db = 0,
  password,
}) {
  const config = {
    host,
    port,
    db,
  };
  if (password) {
    config.password = password;
  }
  return new Redis(config);
}
