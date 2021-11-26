// dependencies
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const { EXCHANGE_NAME } = process.env;

amqp.connect('amqp://localhost:5673', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: false });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(' [*] Waiting for messages to send progress notification %s. To exit press CTRL+C', q.queue);
      channel.bindQueue(q.queue, EXCHANGE_NAME, '');

      channel.consume(q.queue, function(msg) {
        if (msg.content) {
          console.log(' [x] Sending progress notification - PDF ', msg.content.toString());
        }
      }, {
        noAck: true
      });
    });
    
  });
});