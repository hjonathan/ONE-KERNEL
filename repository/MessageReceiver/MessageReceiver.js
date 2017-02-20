// # Message Receiver module
// ## description
// The message receiver module uses an adapter that instantiates a 
// driver for a message broker like RabbitMQ, 0mq or apache kafka.
// In order to subscribe the main module to the message handler
// system.

var Adapter = require('./Adapter/Adapter.js');

// The message receiver has only one attribute, the adapter
var MessageReceiver = function(connection) {
    this.adapter = new Adapter(connection);
}

// The only method for the receiver is the subscribe method
MessageReceiver.prototype.subscribe = function (callback, done) {
    this.adapter.subscribe(callback, done);
}

// Exports the module.
module.exports = MessageReceiver;
