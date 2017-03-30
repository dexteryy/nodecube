
import Sequelize from 'sequelize';
import logger from './logger';

export default function sequelize({
  host,
  port,
  dialect,
  dbname,
  username,
  password,
}) {
  const config = {
    host,
    port,
    dialect,
    timezone: '+08:00',
    logging: logger.info,
  };
  return new Sequelize(
    dbname,
    username,
    password,
    config,
  );
}
