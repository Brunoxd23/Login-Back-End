const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // DATABASE_URL vem do arquivo .env ou do ambiente de produção
  ssl: {
    rejectUnauthorized: false // Isso é necessário para conexões SSL, como no Neon, Heroku, etc.
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
