var deepExtend = require('deep-extend');

/**
 * #Entity
 * An entity is the runtime representation of a record, it possess some behaviors  
 */
var Entity = function () {
	this.events = [];
};

/**
 * ### The addEvent method
 * Stores a determined event inside the entity event store array. 
 */
Entity.prototype.addEvent = function (event, done) {
	if (this.validateEvent(event)) {
		if (this.events.length === 0) {
			event.version = (this.version || 1);
		} else {
			event.version = this.events[this.events.length - 1].version + 1;
		}
		this.events.push(event);
		done(null, this.events);
	} else {
		done(new Error("Not a valid event.", event));
	}
};

/**
 * ### The applyEvents method
 * Apply the local store events into the main object entity.  
 */
Entity.prototype.applyEvents = function (done) {
	var self = this;
	this.events.forEach(function (element) {
		self.mergeEvent(element, function () {
			
		});
	});
	done(null, this);
};

/**
 * ### The mergeEvent method
 * Merges an event into the main object  
 */
Entity.prototype.mergeEvent = function (event, done) {
	deepExtend(this, event);
	done(null, this);
};

/**
 * ### The applyEvents method
 * Apply the local store events into the main object entity.  
 */
Entity.prototype.validateEvent = function (event) {
	return true;
};

/**
 * ### The revert method
 * Revert to any previous state.   
 */
Entity.prototype.revert = function (version, done) {
	var self = this;
	this.emptyAttributes(function (err, entity) {
		self.events.forEach(function (element) {
			if (element.version <= version) {
				self.mergeEvent(element, function () {
				});
			} else {
				done(null, self);
			}
		});
	});
};

/**
 * ### The emptyAttributes method
 * Removes the attributes of the entity.  
 */
Entity.prototype.emptyAttributes = function (done) {
	delete this.version;
	delete this.event;
	delete this.createdBy;
	delete this.modifiedBy;
	delete this.data;
	done(null, this);
};

/**
 * ### The loadEvents method
 * Loads the events into the local event store, however needs
 */
Entity.prototype.loadEvents = function (loader, done) {
	var self = this;
	loader(this._id, function (err, result) {
		delete self.events;
		self.events = result;
		self.emptyAttributes(function () {
			self.applyEvents(done);
		});
	});
};

/**
 * ### The commitEvents method
 * Commit the current list of events using a passed commit function, 
 * so it can deliver those changes asynchronously.  
 */
Entity.prototype.commitEvents = function (commit, done) {
	var event;
	while (event = this.events.shift()) {
		commit(event, function(){
			
		});
	}
	done(null, this);
};

module.exports = Entity;