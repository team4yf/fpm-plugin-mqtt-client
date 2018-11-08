const should = require("chai").should();
const fpmc = require("yf-fpm-client-js").default;
const { Func } = fpmc;
fpmc.init({appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999'});


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
})
