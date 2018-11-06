const _ = require('lodash');
const mqtt = require('mqtt');
const crypto = require('crypto');

let client;
module.exports = {
  bind: (fpm) => {
    // Run When Server Init
    fpm.registerAction('INIT', () => {
      const mqttserverOption = fpm.getConfig('mqttserver', {
          host: 'localhost',
          port: 1883,
          username: 'admin',
          password: '123123123',
          clientId: 'fpm-client-nodejs-' + crypto.randomBytes(4).toString('hex') ,
        });
      const { host, port, username, password, clientId } = mqttserverOption;

      client = mqtt.connect(`mqtt://${host}:${port}`, { username, password, clientId });
    })

    const bizModule = {
      publish: async (args) => {
        client.publish(args.topic, args.payload, { qos: args.qos || 1, retain: true});
        return 1;
      },
      subscribe: async (args) => {
        client.subscribe(args.topic, (topic, message) => {
          fpm.publish(topic, message);
        });
        return 1;
      }
    };

    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('mqttclient', bizModule)
    })
    return client;
  }
}
