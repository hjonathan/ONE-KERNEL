var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var Entity = require('../../../repository/Entity/Entity.js');
var Event = require('../../../repository/Entity/Event.js');

describe('Entity', function () {
    var entity;
    describe('#addEvent()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should create a record entry or event', function (done) {
            var event = new Event();
            event.createdBy = 'user01';
            event.modifiedBy = 'user01';
            event.data = {};
            entity.addEvent(event, function (err, result) {
                expect(result.length).to.be.equal(1);
                done();
            });
        });

        after(function () {

        });
    });

    describe('#applyEvents()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should apply a series of events to an entity', function (done) {
            var first_event = new Event();
            first_event.createdBy = 'user01';
            first_event.modifiedBy = 'user01';
            first_event.data = {};

            var second_event = new Event();
            second_event.modifiedBy = 'user02';
            second_event.data = { "name": "Luca" };

            entity.addEvent(first_event, function () {

            });

            entity.addEvent(second_event, function () {

            });

            var expectedEntity = {
                version: 2,
                createdBy: 'user01',
                modifiedBy: 'user02',
                data: { "name": "Luca" }
            };

            entity.applyEvents(function (err, result) {
                expect(result.createdBy).to.be.deep.equal(expectedEntity.createdBy);
                expect(result.modifiedBy).to.be.deep.equal(expectedEntity.modifiedBy);
                expect(result.data).to.be.deep.equal(expectedEntity.data);
                expect(result.version).to.be.deep.equal(expectedEntity.version);
                done();
            });
        });

        after(function () {

        });
    });

    describe('#mergeEvent()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should apply a series of events to an entity', function (done) {
            var someEvent = new Event();
            someEvent.createdBy = 'user01';
            someEvent.modifiedBy = 'user01';
            someEvent.data = {};

            entity.addEvent(someEvent, function () { });

            var expectedEntity = {
                version: 1,
                createdBy: 'user01',
                modifiedBy: 'user01',
                data: {}
            };

            entity.mergeEvent(someEvent, function (err, result) {
                expect(result.createdBy).to.be.deep.equal(expectedEntity.createdBy);
                expect(result.modifiedBy).to.be.deep.equal(expectedEntity.modifiedBy);
                expect(result.data).to.be.deep.equal(expectedEntity.data);
                done();
            });
        });

        after(function () {

        });
    });

    describe('#revert()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should revert to a determined version', function (done) {
            entity.events = [
                {
                    version: 1,
                    event: 'creation',
                    createdBy: 'user01',
                    modifiedBy: 'user01',
                    data: {
                        'name': 'Pabloo',
                        'last_name': 'Milanes'
                    }
                },
                {
                    version: 2,
                    event: 'formStep',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Pablo',
                    }
                },
                {
                    version: 3,
                    event: 'changeData',
                    modifiedBy: 'user03',
                    data: {
                        'last_name': 'Morales'
                    }
                },
                {
                    version: 4,
                    event: 'endEvent',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Paolo',
                        'phone_number': '83928322'
                    }
                }
            ];

            var expectedEntity = {
                version: 3,
                event: 'changeData',
                createdBy: 'user01',
                modifiedBy: 'user03',
                data: {
                    'name': 'Pablo',
                    'last_name': 'Morales'
                }
            };

            entity.applyEvents(function () {
                entity.revert(3, function (err, result) {
                    expect(result.version).to.be.deep.equal(expectedEntity.version);
                    expect(result.event).to.be.deep.equal(expectedEntity.event);
                    expect(result.createdBy).to.be.deep.equal(expectedEntity.createdBy);
                    expect(result.modifiedBy).to.be.deep.equal(expectedEntity.modifiedBy);
                    expect(result.data).to.be.deep.equal(expectedEntity.data);
                    done();
                });
            });
        });

        after(function () {

        });
    });

    describe('#loadEvents()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should load a number of events based on a function passed as an argument', function (done) {
            var events = [
                {
                    version: 1,
                    event: 'creation',
                    createdBy: 'user01',
                    modifiedBy: 'user01',
                    data: {
                        'name': 'Pabloo',
                        'last_name': 'Milanes'
                    }
                },
                {
                    version: 2,
                    event: 'formStep',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Pablo',
                    }
                },
                {
                    version: 3,
                    event: 'changeData',
                    modifiedBy: 'user03',
                    data: {
                        'last_name': 'Morales'
                    }
                },
                {
                    version: 4,
                    event: 'endEvent',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Paolo',
                        'phone_number': '83928322'
                    }
                }
            ];

            var expectedEntity = {
                version: 4,
                event: 'endEvent',
                createdBy: 'user01',
                modifiedBy: 'user02',
                data: {
                    'name': 'Paolo',
                    'last_name': 'Morales',
                    'phone_number': '83928322'
                }

            };

            var loader = function (recordId, cb) {
                cb(null, events);
            };

            entity.loadEvents(loader, function (err, result) {
                expect(result.version).to.be.deep.equal(expectedEntity.version);
                expect(result.event).to.be.deep.equal(expectedEntity.event);
                expect(result.createdBy).to.be.deep.equal(expectedEntity.createdBy);
                expect(result.modifiedBy).to.be.deep.equal(expectedEntity.modifiedBy);
                expect(result.data).to.be.deep.equal(expectedEntity.data);
                expect(result.events.length).to.be.equal(4);
                done();
            });
        });

        after(function () {

        });
    });

    describe('#commitEvents()', function () {
        beforeEach(function () {
            entity = new Entity();
        });

        it('should commit a number of events based on a function passed as an argument', function (done) {
            var events = [
                {
                    version: 1,
                    event: 'creation',
                    createdBy: 'user01',
                    modifiedBy: 'user01',
                    data: {
                        'name': 'Pabloo',
                        'last_name': 'Milanes'
                    }
                },
                {
                    version: 2,
                    event: 'formStep',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Pablo',
                    }
                },
                {
                    version: 3,
                    event: 'changeData',
                    modifiedBy: 'user03',
                    data: {
                        'last_name': 'Morales'
                    }
                },
                {
                    version: 4,
                    event: 'endEvent',
                    modifiedBy: 'user02',
                    data: {
                        'name': 'Paolo',
                        'phone_number': '83928322'
                    }
                }
            ];
            entity.events = events;
            var commiter = function (element, cb) {
                cb(null, element);
            };

            var commiterSpy = sinon.spy(commiter);

            entity.commitEvents(commiterSpy, function (err, result) {
                expect(commiterSpy.callCount).to.be.equal(4);
                expect(result.events.length).to.be.equal(0);
                done();
            });
        });

        after(function () {

        });
    });
});