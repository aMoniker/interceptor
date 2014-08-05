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

    this.filters[name][order] = this.filters[name][order].concat([callback]);
    if (this.filtersIndex[name].indexOf(order) === -1) {
        this.filtersIndex[name].push(order);
    }

    return true;
};

Interceptor.prototype.applyFilter = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ret = args.length ? args[0] : undefined;

    if (!this.filters[name] || !this.filtersIndex[name]) { return ret; }

    this.filtersIndex[name].sort(function(a, b) {
        if (a === b) { return 0; }
        return (a > b ? 1 : -1);
    });

    for (var i = 0; i < this.filtersIndex[name].length; i++) {
        var order = this.filtersIndex[name][i];
        if (!this.filters[name][order]) { continue; }

        for (var j = 0; j < this.filters[name][order].length; j++) {
            var callback = this.filters[name][order][j];
            if (typeof callback !== 'function') { continue; }
            ret = args[0] = callback.apply(undefined, args);
        }
    }

    return ret;
};

Interceptor.prototype.removeFilter = function() {

};

Interceptor.prototype.clearFilters = function() {
    this.filters = {};
    this.filtersIndex = {};
    return true;
}

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
