const should = require("chai").should();
const fpmc = require("yf-fpm-client-js").default;
const { Func } = fpmc;
fpmc.init({appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999'});

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883', {
	username: 'admin',
	password: '123123123',
	clientId: 'test-client',
});

client.subscribe(['$test', '$test2']);

describe('Function', function(){
  beforeEach(done => {
    done()
  })


  afterEach(done => {
    done()
  })

  it('Function A', function(done){
    var func = new Func('mqttclient.publish');
    func.invoke({topic: '$s2d/a111/fake', payload: '030303', format: 'string'})
      .then(function(data){
        console.log(data)
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('Function B', function(done){
    this.timeout(10 * 1000);
    // client.publish('$test', 'content');
    var func = new Func('mqttclient.publish');
    func.invoke({topic: '$test', payload: 'content', format: 'string'})
      .then(function(data){
        console.log(data)
      }).catch(function(err){
        done(err);
      })
    client.on('message', (topic, message) => {
      if(topic == '$test'){
        message.toString().should.equal('content');
        done();
      }
    });
  })

  it('Function B', function(done){
    this.timeout(10 * 1000);
    // client.publish('$test', 'content');
    var func = new Func('mqttclient.publish');
    func.invoke({topic: '$test2', payload: '01020304', format: 'hex'})
      .then(function(data){
        console.log(data)
      }).catch(function(err){
        done(err);
      })
    client.on('message', (topic, message) => {
      if(topic == '$test2'){
        message.toString('hex').should.equal('01020304');
        done();
      }
    });
  })

})
