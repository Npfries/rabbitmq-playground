import amqplib from "amqplib";

(async () => {
  const exchange = "tasks_exchange";
  const queue1 = "tasks1";
  const queue2 = "tasks2";
  const queue3 = "tasks3";

  const conn = await amqplib.connect(process.env.RABBIT_MQ_HOST ?? "localhost");

  const ch1 = await conn.createChannel();
  await ch1.assertExchange(exchange, "fanout", {});
  await ch1.assertQueue(queue1);
  await ch1.assertQueue(queue2);
  await ch1.bindQueue(queue1, exchange, "");
  await ch1.bindQueue(queue2, exchange, "");

  const ch2 = await conn.createChannel();
  ch2.assertQueue(queue3);

  setInterval(() => {
    const message = Buffer.from("something to do");
    ch1.publish(exchange, "", message);
    ch2.sendToQueue(queue3, message);
  }, 100);
})();
