// # RabbitMQAdapter module
// ## description
// This driver allows the main adapter to use the rabbitmq
// message broker implementations.
var RabbitDriver = require('rabbit.js');

var RabbitMQAdapter = function() {
    this.type = 'rabbitmq';
    this.connection = {};
};

// The connect method loads the message connection into the connection
// attribute.
RabbitMQAdapter.prototype.connect = function(message) {
    this.connection = message.connection;
};

// The validateConnection method validates the connection parameters
RabbitMQAdapter.prototype.validateConnection = function(message) {
    var res = true;
    if (
        message.connection.amqp == null
        || message.connection.type == null
        || message.connection.channel == null
        || message.type != "rabbitmq"
    ) {
        res = false;
    }
    return res;
};

// The subscribe method registers the driver to a channel and enables 
// the communication with a rabbitmq instance.
RabbitMQAdapter.prototype.subscribe = function (done) {
    var connection = this.connection;
    var context = RabbitDriver.createContext(connection.amqp);
    context.on('ready', function() {
        var sub = context.socket(connection.type, {routing: 'direct'});
        sub.connect(connection.channel, function() {
            done (null, sub);
        });
    });
    context.on('error', function(){
        console.log('[x] Context error');
    });
};

// The main module is being exported.
module.exports = RabbitMQAdapter;