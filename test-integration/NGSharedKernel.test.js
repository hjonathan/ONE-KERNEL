var NGSharedKernel = require('../NGSharedKernel.js');
var SharedRepository = require('../repository/SharedRepository.js');

var sinonChai = require('sinon-chai');
var sinon  = require('sinon');
var chai   = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('NGSharedKernel', function () {
    describe("#create()", function () {
        var sharedKernel;
        beforeEach(function () {
            sharedKernel = sinon.createStubInstance(NGSharedKernel);
        });

        it ('should be able to create an instance of a message dispatcher.', function (done) {
            var message = {};
            var expectedObject = {};
            var sharedRepository = new SharedRepository();
            sharedKernel.create.restore();
            sharedKernel.repository = {
                retrieve : function(){
                    return {};
                }
            };
            var result = sharedKernel.create('MessageDispatcher', message);
            expect(result).to.be.a('object');
            done();
        });

        it ('should be able to create an instance of a message receiver.', function (done) {
            var message = {};
            var expectedObject = {};
            var sharedRepository = new SharedRepository();
            sharedKernel.create.restore();
            sharedKernel.repository = {
                retrieve : function(){
                    return {};
                }
            };
            var result = sharedKernel.create('MessageReceiver', message);
            expect(result).to.be.a('object');
            done();
        });
        
        after(function() {
            
        });
    });
    
    describe("#subscribe()", function() {
        var sharedKernel;
        beforeEach(function () {
            sharedKernel = new NGSharedKernel();
        });
        it ('should subscribe', function (done) {
            var subscription = {
                'type' : 'rabbitmq',
                'connection' : {
                    'amqp'    : 'amqp://localhost:5672',
                    'type'    : 'SUB',
                    'channel' : 'events'
                }
            };
            var receiver = sharedKernel.create('MessageReceiver', subscription);
            receiver.subscribe(function (err, data) {
                console.log('message[x]:' + JSON.stringify(data));
            }, done);
        });
        after(function() {
            
        });
    });
    
    describe("#sendMessage()", function() {
        var sharedKernel;
        beforeEach(function () {
            sharedKernel = new NGSharedKernel();
        });
        xit ('should connect and send message data to a broker', function (done) {
            var message = {
                'type' : 'rabbitmq',
                'connection' : {
                    'amqp'    : 'amqp://localhost:5672',
                    'type'    : 'PUB',
                    'channel' : 'events'
                },
                'payload' : 'some message'
            };
            var dispatcher = sharedKernel.create('MessageDispatcher', message);
            dispatcher.sendMessage(message, function (err, result) {
                expect(result).to.be.a('object');
                done();
            });
        });
        after(function() {
            
        });
    });

});