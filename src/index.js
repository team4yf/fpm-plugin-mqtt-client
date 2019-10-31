const _ = require('lodash');
const mqtt = require('mqtt');
const crypto = require('crypto');
const debug = require('debug')('fpm-plugin-mqtt-client');

let client;
module.exports = {
  bind: (fpm) => {
    // Run When Server Init
    fpm.registerAction('INIT', () => {
      const { MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASS, MQTT_CLIENTID } = fpm.getEnv();
      const config = fpm.getConfig('mqttserver', {});
      const option = _.assign({
        host: 'localhost',
        port: 1883,
        username: 'admin',
        password: '123123123',
        clientId: 'fpm-client-nodejs-' + crypto.randomBytes(4).toString('hex') ,
      }, config);
      const { host, port, username, password, clientId } = Object.assign(option, {
        host: MQTT_HOST || option.host,
        port: MQTT_PORT || option.port,
        username: MQTT_USER || option.username,
        password: MQTT_PASS || option.password,
        clientId: MQTT_CLIENTID || option.clientId,
      });
      debug('The MQTT Connection Options: %O', { host, port, username, password, clientId })
      client = mqtt.connect(`mqtt://${host}:${port}`, { username, password, clientId });
      client.on('message', (topic, payload) => {
        fpm.publish(topic, payload);
      });
    })

    const bizModule = {
      publish: async (args) => {
        const { format = 'string', payload = '' } = args;
        if(format == 'hex'){
          args.payload = Buffer.from(payload, 'hex');
        }else{
          args.payload = payload.toString();
        }
        debug('Public a message: %O', args);
        client.publish(args.topic, args.payload, { qos: args.qos || 2, retain: true });
        return 1;
      },
      subscribe: async (args) => {
        const { topic } = args;
        if(_.isArray(topic)){
          client.subscribe(topic);
        }else if(_.isString(topic)){
          const topics = topic.split(',');
          client.subscribe(topics);
        }
        return 1;
      },
      unsubscribe: async (args) => {
        const { topic } = args;
        if(_.isArray(topic)){
          client.unsubscribe(topic);
        }else if(_.isString(topic)){
          const topics = topic.split(',');
          client.unsubscribe(topics);
        }
        return 1;
      },
    };

    fpm.registerAction('BEFORE_SERVER_START', () => {
      fpm.extendModule('mqttclient', bizModule)
    })
    return bizModule;
  }
}
