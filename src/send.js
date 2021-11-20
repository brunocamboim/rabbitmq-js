// dependencies
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const { RABBITMQ_QUEUE_NAME } = process.env;

amqp.connect('amqp://localhost:5673', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const msg = 'Hello World!';
    
    channel.assertQueue(RABBITMQ_QUEUE_NAME, {
      durable: false
    });
    channel.sendToQueue(RABBITMQ_QUEUE_NAME, Buffer.from(msg));

    console.log(' [x] Sent %s', msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});