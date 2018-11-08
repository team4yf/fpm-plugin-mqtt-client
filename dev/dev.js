'use strict';
const { Fpm } = require('yf-fpm-server');
const plugin = require('../src');
let app = new Fpm()
const ref = plugin.bind(app)
console.info('the plugin ref:', ref)
let biz = app.createBiz('0.0.1');

biz.addSubModules('test',{
	foo: args => {
		return Promise.reject({errno: -3001})
	}
})
app.addBizModules(biz);

// this plugin should run when INIT , but we cant run it in Dev Mode, so We should Run It Manually
app.runAction('INIT', app);

app.subscribe('$s2d/a111/fake', (topic, data)=>{
	console.log(topic, data);
});
app.run().then(() => {
	ref.subscribe({ topic: '$s2d/a111/fake'});
});

// setTimeout(() => {
// 	ref.unsubscribe({topic: '$s2d/a111/fake'})
// }, 15000);
