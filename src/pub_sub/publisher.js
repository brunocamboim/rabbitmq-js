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

    channel.assertExchange(EXCHANGE_NAME, 'fanout', {durable: false});
    for (let i = 1; i < 10; i++) {
      const msg = `/path/to/pdf/pdf_name_${i}.pdf`;

      channel.publish(EXCHANGE_NAME, '', Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
    }    
    
  });
});