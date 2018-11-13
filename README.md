## FPM-PLUGIN-MQTT-CLIENT
用于 mqtt-client 的插件

### Install
```bash
npm add fpm-plugin-mqtt-client --save
```

### Useage

- config

  ```javascript
  {
    "mqttserver":{
      "host": "localhost",
      "port": 1883,
      "username": "admin",
      "password": "123123123",
      "clientId": "foo",
    }
  }
  ```

  docker enviroment
  ```yml
  MQTT_HOST: mqttserver
  MQTT_PORT: 1883
  MQTT_USER: 'admin'
  MQTT_PASS: '123123123'
  MQTT_CLIENTID: 'client-foo'
  ```

- subscribe

  ```javascript
  // subscribe a topic
  fpm.execute('mqttclient.subscribe', { topic: '$d2s/a111' });

  // subscribe topics
  fpm.execute('mqttclient.subscribe', { topic: '$d2s/a111,$test' });
  // or
  fpm.execute('mqttclient.subscribe', { topic: [ '$d2s/a111', '$test'] });


  // handle the message.
  fpm.subscribe('$d2s/a111', (topic, payload) => {
    console.log(topic, payload);
  });
  ```

- other

  ```javascript

  ```