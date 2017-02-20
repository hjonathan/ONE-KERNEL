var rewire = require('rewire');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var RabbitMQAdapter = rewire('../../../../repository/MessageReceiver/Adapter/RabbitMQAdapter.js');
var rabbitMQAdapter;

describe('RabbitMQAdapter', function () {
    describe('#connect()', function () {
        beforeEach(function() {
            rabbitMQAdapter = new RabbitMQAdapter();
        });
        it('should connect to the broker server', function () {
            var messageMock = {
                connection : { 'amqp' : 'localhost' }
            };
            rabbitMQAdapter.connect(messageMock);
            expect(rabbitMQAdapter.connection).to.be.eql(messageMock.connection);
        });
    });

    describe('#validateConnection()', function () {
        beforeEach(function() {
            rabbitMQAdapter = new RabbitMQAdapter();
        });
        it('should validate the connection', function () {
            var messageMock = {
                'type': 'rabbitmq',
                'connection' : {
                    'amqp' : 'localhost',
                    'type' : 'PUB',
                    'channel' : 'dh.rabbit'
                }
            };
            expect(
                rabbitMQAdapter.validateConnection(messageMock)
            ).to.be.true;
        });
        it('should not validate the connection', function () {
            var messageMock = {
                connection : { 
                    'amqp' : 'localhost',
                    'channel' : 'dh.rabbit'
                }
            };
            expect(
                rabbitMQAdapter.validateConnection(messageMock)
            ).to.be.false;
        });
    });
	
	describe('#subscribe()', function (done) {
        beforeEach(function() {
            rabbitMQAdapter = new RabbitMQAdapter();
        });
        it('should subscribe to the messaging channel', function () {
			var callback = sinon.spy();
			var socket = {
				"connect" : function(channel, cb){
					callback();
				}
			};
			var context = {
				"on" : function(event, cb) {
					cb(null, {});
				},				
				"socket" : function(type, options){
					return socket;
				}
			};
            RabbitMQAdapter.__set__("RabbitDriver", {
				createContext: function() {
					return context;
				} 
			});
            rabbitMQAdapter.subscribe(done);
			expect(callback.called).to.be.true;
        });
    });
});