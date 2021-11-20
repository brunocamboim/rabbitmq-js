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

    channel.assertQueue(RABBITMQ_QUEUE_NAME, {
      durable: false
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', RABBITMQ_QUEUE_NAME);

    channel.consume(RABBITMQ_QUEUE_NAME, function(msg) {
      console.log(' [x] Received %s', msg.content.toString());
    }, {
      noAck: true
    });
  });
});