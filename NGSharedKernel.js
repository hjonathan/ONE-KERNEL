// # NextGen Shared Kernel
// ## description
// The Shared Kernel module stores the common functionality for
// the whole platform, all the modules should be maintained separately 
// but be centralized through this central hub, and distributed accordingly
// accross the entire platform.

// The internal module repository is known as the Shared Repository.
// and is also an internal dependency.
var SharedRepository = require('./repository/SharedRepository.js');

// The NGSharedKernel module definition
var NGSharedKernel = function () {
    // #####repository
    // The repository attribute is the responsible of retrieve the
    // module implementation for each case.
    this.repository = new SharedRepository();
}

// 
NGSharedKernel.prototype.create = function(name, message) {
    return this.repository.retrieve(name, message);
}

// Exporting the module
module.exports = NGSharedKernel;