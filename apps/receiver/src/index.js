import amqplib from "amqplib";

(async () => {
  /** @type {string} */
  // @ts-ignore
  const queue = process.env.QUEUE_NAME;
  const conn = await amqplib.connect(process.env.RABBIT_MQ_HOST ?? "localhost");

  const channel = await conn.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Received:", msg.content.toString());
      channel.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();
