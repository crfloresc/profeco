const amqp = require('amqplib');
const { info, error } = require('../helpers/Logger');

// https://www.compose.com/articles/nodejs-mongodb-elasticsearch-and-postgresql-the-compose-grand-tour/

const options = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: '',
  password: ''
};

let routingKey = 'words';
let exchangeName = 'logs';
let qName = 'sample';
const open = amqp.connect(options)
  .then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.assertExchange(exchangeName, 'direct', {
      durable: true
    }).then(() => {
      return ch.assertQueue(qName, {
        exclusive: false
      }).then((q) => {
        return ch.bindQueue(q.queue, exchangeName, routingKey);
      });
    });
  }).catch((err) => {
    throw err;
  });

/*
addMessage(req.body.message).then((data) => {
  res.json(data)
    .status(200);
})
.catch((err) => {
  error(err);
  res.json(err)
    .status(500);
});
*/
const addMessage = (msg) => {
  return open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    ch.publish(exchangeName, routingKey, new Buffer(msg));

    info('[x] on addMessage - msg: ' + msg + ', date: ' + new Date());

    return new Promise((resolve) => {
      resolve(msg);
    });
  });
};

/*
getMessage().then((words) => {
  res.json(words)
    .status(200);
}).catch((err) => {
  error(err);
  res.status(500).send(err);
});
*/
const getMessage = () => {
  return open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.get(qName, {})
      .then((msgOrFalse) => {
        return new Promise(resolve => {
          let result = "No messages in queue";
          if (msgOrFalse !== false) {
            result =
              msgOrFalse.content.toString() +
              " : Message received at " +
              new Date();
            ch.ack(msgOrFalse);
          }
          info(' [-] ' + result);
          resolve(result);
        });
      });
  });
};

const onError = (err) => {
  error('[AMQP] emit ' + err.message);
  offlinePubQueue.push([exchange, routingKey, content]);
  pubChannel.connection.close();
};

module.exports = {};
