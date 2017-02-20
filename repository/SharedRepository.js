/**
 * # SharedRepository
 * The Shared Repository module stores and calls the respective base implementations
 * that the Shared Kernel needs to provide to the modules that require those
 * modules.
 */

var MessageDispatcher = require('./MessageDispatcher/MessageDispatcher.js');
var MessageReceiver   = require('./MessageReceiver/MessageReceiver.js');
var Entity = require('./Entity/Entity.js');
var Event = require('./Entity/Event.js');
var Logger = require('./Logger/Logger.js');
var NullModule        = require('./NullModule/NullModule.js');

/**
 * ## constructor
 */
var SharedRepository = function() {
    
}

/**
 * ## retrieve(name, message)
 * Retrieves the object to be provided.
 * * name: The object instance name.
 * * message: The message payload, also includes connection details.
 */
SharedRepository.prototype.retrieve = function(name, params) {
    var instance;
    switch(name) {
        case 'MessageReceiver':
            instance = new MessageReceiver(params);
            break;
        case 'MessageDispatcher':
            instance = new MessageDispatcher(params);
            break;
        case 'Logger':
            instance = new Logger(params);
            break;
        case 'Entity':
            instance = new Entity();
            break;
        case 'Event':
            instance = new Event();
            break;
        default:
            instance = new NullModule();
            break;
    }
    return instance;
};

// Exports the module.
module.exports = SharedRepository;