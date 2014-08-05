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

Interceptor.prototype.addFilter = function() {

};

Interceptor.prototype.applyFilter = function() {

};

Interceptor.prototype.removeFilter = function() {

};

Interceptor.prototype.noConflict = function(global_name) {
    global_name = global_name || 'InterceptorJS';
    console.log('using global name', global_name);
    (window || global).Interceptor = undefined;
    (window || global)[global_name] = new Interceptor;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {};
}

init();

})();
