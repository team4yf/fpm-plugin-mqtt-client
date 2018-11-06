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

- subscribe

  ```javascript
  // subscribe a topic
  fpm.execute('mqttclient.subscribe', { topic: '$d2s/a111' });

  // handle the message.
  fpm.subscribe('$d2s/a111', (topic, payload) => {
    console.log(topic, payload);
  });
  ```

- other

  ```javascript

  ```