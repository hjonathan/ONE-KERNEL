var NullAdapter = function () {
    this.type = "null";
};

NullAdapter.prototype.validateConnection = function (connection, done) {
    return false;
};

NullAdapter.prototype.receiveMessage = function (payload, done) {
    return {'type' : 'error', 'message': 'Invalid connection object'};
};

module.exports = NullAdapter;