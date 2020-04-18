module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  rabbitmq: {
    apiKey: process.env.RABBITMQ_API_KEY,
    host: process.env.RABBITMQ_HOST,
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD
  }
}
