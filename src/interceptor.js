(function() {

var Interceptor = function() {};

Interceptor.prototype.version = '0.0.1';

var init;
var initialized = false;
Interceptor.prototype.init = init = function(force) {
    if (initialized && !force) { return true; }

    var interceptor = new Interceptor;

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = interceptor;
    } else if (window || global) {
        (window || global).Interceptor = interceptor;
    }

    initialized = true;

    return true;
}

Interceptor.prototype.filters = {};
Interceptor.prototype.filtersIndex = {};

Interceptor.prototype.addFilter = function(name, callback, order) {
    order = order || 10;

    if (!name || typeof name !== 'string') {
        throw new TypeError('name argument must be a valid string');
    }

    if (!callback || typeof callback !== 'function') {
        throw new TypeError('callback argument must be a valid function');
    }

    if (typeof order !== 'number') {
        throw new TypeError('order argument must be a number');
    }

    if (!this.filters[name])        { this.filters[name]        = {}; }
    if (!this.filters[name][order]) { this.filters[name][order] = []; }
    if (!this.filtersIndex[name])   { this.filtersIndex[name]   = []; }

    this.filtersIndex[name][order] = order;
    this.filters[name][order] = this.filters[name][order].concat([callback]);

    return true;
};

Interceptor.prototype.applyFilter = function() {

};

Interceptor.prototype.removeFilter = function() {

};

Interceptor.prototype.noConflict = function(global_name) {
    global_name = global_name || 'InterceptorJS';
    (window || global).Interceptor = undefined;
    (window || global)[global_name] = new Interceptor;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {};
}

init();

})();
