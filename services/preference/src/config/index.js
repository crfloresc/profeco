module.exports = {
  server: {
    env: process.env.ENV || 'dev',
    port: process.env.PORT || 3035,
    secret: process.env.SECRET || 'eEjmHOg13V2ksbi'
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || 'BjfOFS1NUTao2B2'
  },
  db: {
    uri: process.env.DATABASE_URI || 'mongodb://admin:pass1234@ds161890.mlab.com:61890/profeco',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  },
  rabbitmq: {
    // apiKey: process.env.RABBITMQ_API_KEY || '',
    protocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
    hostname: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || 5672,
    username: process.env.RABBITMQ_USERNAME || 'profeco',
    password: process.env.RABBITMQ_PASSWORD || 'admin123456'
  }
}
