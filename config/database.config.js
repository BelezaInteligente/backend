module.exports = {
  dialect: 'mysql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASS || 'cetel1540',
  database: process.env.DB_NAME || 'beleza_inteligenteDB',
  host: process.env.DB_HOST || '127.0.0.1',
  define: {
    timestemps: true,
  }
};