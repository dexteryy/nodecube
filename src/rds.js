
import Sequelize from 'sequelize';
import logger from './logger';

const isProductionEnv = process.env.NODE_ENV === 'production';

export default function sequelize({
  host,
  port,
  dialect,
  dbname,
  username,
  password,
}) {
  const config = {
    host: host || !isProductionEnv && 'mysql' || '',
    port: port || !isProductionEnv && '3306' || '',
    dialect,
    timezone: '+08:00',
    logging: logger.info,
  };
  return new Sequelize(
    dbname || !isProductionEnv && 'default' || '',
    username || !isProductionEnv && 'root' || '',
    password,
    config,
  );
}
