const mqtt = require('mqtt');
const config = require('../config.json');
const { host, port, username, password, clientId } = config.mqttserver;
const client = mqtt.connect(`mqtt://${host}:${port}`, {
	username: username,
  password: password,
  clientId: 'fake_bot'
});

client.publish('$s2d/a111/fake', 'foobar');
setInterval(() => {
  client.publish('$s2d/a111/fake', 'foobar');
}, 5*1000);
client.subscribe(['$d2s/a111/fake'])
client.on('message', (topic, payload) => {
  console.log('bot receive: ', topic, payload.toString());
})