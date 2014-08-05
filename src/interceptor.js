(function() {

var Interceptor = function() {};

Interceptor.prototype.version = '0.0.1';

Interceptor.prototype.addFilter = function() {

};

Interceptor.prototype.applyFilter = function() {

};

Interceptor.prototype.removeFilter = function() {

};

Interceptor.prototype.noConflict = function(global_name) {

};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = new Interceptor;
} else if (window || global) {
    (window || global).Interceptor = new Interceptor;
}

})();
