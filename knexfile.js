module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fitpic'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
