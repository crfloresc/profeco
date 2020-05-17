module.exports = {
  client: {
    env: process.env.ENV || 'dev',
    port: process.env.PORT || 8000,
    secret: process.env.SECRET || 'eEjmHOg13V2ksbi'
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || 'BjfOFS1NUTao2B2'
  }
}
