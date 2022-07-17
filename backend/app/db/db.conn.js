import postgresql from 'pg';
import dbConfig from '../configs/db.config.js';
const { Pool } = postgresql;

const credentials = {
  user: dbConfig.USER,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  host: dbConfig.HOST,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export default (callback = null) => {
  const pool = new Pool(credentials);
  const connection = {
    pool,
    query: (...args) => {
      return pool.connect().then((client) => {
        return client.query(...args).then((res) => {
          client.release();
          return res.rows;
        });
      });
    },
  };

  process.postgresql = connection;

  if (callback) {
    callback(connection);
  }

  return connection;
};