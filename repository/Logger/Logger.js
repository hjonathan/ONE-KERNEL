var winston = require('winston');

var Logger = function (moduleName) {
	winston.add(winston.transports.File, { filename: moduleName+'.log' });
	this.logger = winston;
};

Logger.prototype.log = function(logType, message) {
	this.logger.log(logType, message);
};

module.exports = Logger;