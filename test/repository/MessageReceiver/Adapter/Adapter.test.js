var rewire = require('rewire');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var Adapter = rewire('../../../../repository/MessageReceiver/Adapter/Adapter.js');
var adapter;

describe('Adapter', function () {
    describe('#selectAdapter()', function () {
        beforeEach(function() {
            var message = {
                type: ''
            };
            adapter = new Adapter(message);
        });

        it('select the RabbitMQ adapter', function () {
            var message = {
                type: 'rabbitmq'
            };
            var rabbitSpy = sinon.spy();
            rabbitSpy.prototype.validateConnection = function() {
                return true;
            };
            rabbitSpy.prototype.connect =  function() {
                return true;
            };
            var nullSpy = sinon.spy();
            nullSpy.prototype.validateConnection = function () {
                return true;
            };
            nullSpy.prototype.connect = function () {
                return true;
            };
            Adapter.__set__('RabbitMQAdapter', rabbitSpy);
			Adapter.__set__('NullAdapter', nullSpy);
            adapter.selectAdapter(message);
            expect(rabbitSpy.called).to.be.true;
            expect(nullSpy.called).to.be.false;
        });
        
        it('select the RabbitMQ adapter', function () {
            var message = {
                type: ''
            };
            var rabbitSpy = sinon.spy();
            rabbitSpy.prototype.validateConnection = function() {
                return true;
            };
            rabbitSpy.prototype.connect =  function() {
                return true;
            };
            var nullSpy = sinon.spy();
            nullSpy.prototype.validateConnection = function () {
                return true;
            };
            nullSpy.prototype.connect = function () {
                return true;
            };
            Adapter.__set__('RabbitMQAdapter', rabbitSpy);
			Adapter.__set__('NullAdapter', nullSpy);
            adapter.selectAdapter(message);
            expect(rabbitSpy.called).to.be.false;
            expect(nullSpy.called).to.be.true;
        });
    });

	describe('#subscribe()', function (done) {
        beforeEach(function() {
            var message = {
                type: ''
            };
            adapter = new Adapter(message);
        });

        it('should subscribe the selected adapter to a messaging channel', function () {
			
        });
    });
});