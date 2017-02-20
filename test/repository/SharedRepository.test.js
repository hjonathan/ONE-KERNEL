var rewire = require('rewire');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var SharedRepository = rewire('../../repository/SharedRepository.js');
var sharedRepository;

describe('SharedRepository', function () {
    describe('#retrieve()', function () {

        beforeEach(function () {
            sharedRepository = new SharedRepository();
        });

        it('should retrieve an Entity', function () {
            var entitySpy = sinon.spy();
            SharedRepository.__set__("Entity", entitySpy);
            sharedRepository.retrieve("Entity");
            expect(entitySpy.called).to.be.true;
        });

        it('should retrieve an Event', function () {
            var eventSpy = sinon.spy();
            SharedRepository.__set__("Event", eventSpy);
            sharedRepository.retrieve("Event");
            expect(eventSpy.called).to.be.true;
        });

        it('should retrieve a MessageReceiver', function () {
            var receiverSpy = sinon.spy();
            SharedRepository.__set__("MessageReceiver", receiverSpy);
            sharedRepository.retrieve("MessageReceiver", {});
            expect(receiverSpy.called).to.be.true;
        });

        it('should retrieve a MessageDispatcher', function () {
            var dispatcherSpy = sinon.spy();
            SharedRepository.__set__("MessageDispatcher", dispatcherSpy);
            sharedRepository.retrieve("MessageDispatcher", {});
            expect(dispatcherSpy.called).to.be.true;
        });
        
        it('should retrieve the default NullModule', function () {
            var nullSpy = sinon.spy();
            SharedRepository.__set__("NullModule", nullSpy);
            sharedRepository.retrieve();
            expect(nullSpy.called).to.be.true;
        });
    });

});