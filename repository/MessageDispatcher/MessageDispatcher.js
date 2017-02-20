var amqp = require('amqplib/callback_api');
var MessageDispatcher = function (options) {
	this.options = options;
    /*
    	options.channel 
    	options.amqp    	
    	options.severity
    	options.typeExchange
     */    
};

MessageDispatcher.prototype.sendMessage = function (message, done) {
    var ex = this.options.channel;
    var exopts = {durable: false};
    var severity = this.options.severity || '';
    var url = this.options.amqp; 
    var that = this;
    var typeExchange = this.options.exchange || 'fanout';
   
    amqp.connect(url,function (err, connection){
        if (err !== null) return that.bail(err, connection, done);         
        connection.createChannel(function (err, channel){
            if (err != null) that.bail(err,connection, done);                
            channel.assertExchange(ex, typeExchange, exopts, function(err, ok) {                 
             	if (err != null) that.bail(err, connection, done);                               
                channel.publish(ex,'', new Buffer(message));                
                channel.close(function() { connection.close(); });                
                done(err, true);
            });
        });
    });
};

MessageDispatcher.prototype.bail = function (err, conn, done) {
	console.error(err);    
    if (conn) conn.close(function() { 
    	process.exit(1); 
    });
    done(err,null);	
};

module.exports = MessageDispatcher;