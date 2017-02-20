var MessageDispatcher = require('../../../repository/MessageDispatcher/MessageDispatcher.js');
var sinonChai = require('sinon-chai');
var sinon  = require('sinon');
var chai   = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('MessageDispatcher', function () {
    describe('#sendMessage()', function () {
        var dispatcher;
        var conn = {
            'amqp'    : 'amqp://localhost:5672',            
            'channel' : "channelTest",
            'exchange': 'direct'            
        };
        beforeEach(function () {
            dispatcher = new MessageDispatcher(conn);
        });
        
        it ('should connect and retrieve data', function (done) {
            var messag = {payload: {}};
            var expectedToken = [];
            var adapterMock = {};
            
            expect(dispatcher.options).to.be.a('object');             
            dispatcher.sendMessage("test message", function (err, result){
                expect(err).to.be.a('object');             
                expect(result).to.be.a('null');                             
                done();
            });
        });
        
        after(function() {
            
        });
    });

});