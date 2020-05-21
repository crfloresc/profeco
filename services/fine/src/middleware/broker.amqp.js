const amqp = require('amqplib');
const config = require('../config/index');
const { info, attach, error } = require('../helpers/logger');

let channel = null;
const connection = async () => {
  await amqp.connect(config.rabbitmq)
    .then(async (conn) => {
      const ch = await conn.createChannel();

      channel = ch;
    });//.timeout(10000);
};

connection()
  .then(() => {
    info('[amqp] connected');
  }).catch((err) => {
    error('[amqp] error ' + err.message);
  });

/**
 * Connect with rabbitmq
 * @param {*} msg El mensaje
 */
const routingKey = 'words'; //
const exchangeName = 'direct'; //
const qName = 'fine-file'; // Nombre de la cola
const test = async (msg) => {
  if (channel != null) {
    await channel.assertExchange(exchangeName, 'direct', {
      durable: false
    });

    await channel.assertQueue(qName, {
      exclusive: false,
      durable: true
    });

    await channel.bindQueue(channel.queue, exchangeName, routingKey);

    attach('[x] attached - msg: ' + msg + ', date: ' + new Date());
  }
};

const consume = async (qName) => {
if (channel != null) {
  return await channel.get(qName, {})
    .then((msgOrFalse) => {
        let result = 'No messages in queue';
        if (msgOrFalse !== false) {
          result = msgOrFalse.content.toString();
          channel.ack(msgOrFalse);
        }
        info(result);
    });
}
};
console.log(consume(qName));

