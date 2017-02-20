// 
var RabbitMQAdapter = require('./RabbitMQAdapter.js');
var NullAdapter = require('./NullAdapter.js');

var Adapter = function (message) {
    this.selectAdapter(message);
};

Adapter.prototype.selectAdapter = function (message) {
    var currentAdapter = this.create(message.type);
    if (currentAdapter.validateConnection(message)) {
        this.currentAdapter = currentAdapter;
        this.currentAdapter.connect(message);
    }
};

Adapter.prototype.create = function (name) {
    var adapter = this.currentAdapter;
    switch (name) {
        case 'rabbitmq' :
            adapter = new RabbitMQAdapter();
            break;
        default:
            adapter = new NullAdapter();
            break;
    }
    return adapter;
};

Adapter.prototype.subscribe = function (callback, done) {
    var result;
    switch (this.currentAdapter.type) {
        case 'rabbitmq' :
            result = this.currentAdapter.subscribe (function(err, subscriber) {
                subscriber.on('data', function(data) {
                    callback(null, data);
                });
                done(null, {});
            });
        break;
        default:
            result = false;
        break;
    }
    return result;
};

module.exports = Adapter;
