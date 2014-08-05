describe('Interceptor exists', function() {

    beforeEach(function() {
        Interceptor.init(true);
    });

    it('exists as a global object', function() {
        expect(Interceptor).toBeDefined();
        expect(Interceptor).toBeTruthy();
    });

    it('has a defined version', function() {
        expect(Interceptor.version).toBeDefined();
        expect(Interceptor.version).toEqual(jasmine.any(String));
    });

    it('has API functions available', function() {
        var api = ['init', 'addFilter', 'applyFilter', 'removeFilter'];

        api.forEach(function(api_func) {
            expect(Interceptor[api_func]).toBeDefined();
            expect(Interceptor[api_func]).toEqual(jasmine.any(Function));
        });
    });

    it('has a noConflict function available', function() {
        expect(Interceptor.noConflict).toBeDefined();
        expect(Interceptor.noConflict).toEqual(jasmine.any(Function));
    });

});

describe('Interceptor noConflict mode works', function() {

    beforeEach(function() {
        (Interceptor || InterceptorJS || FooBarBazQux).init(true);
    });

    it('can be called without any arguments', function() {
        expect(Interceptor).toBeDefined();

        Interceptor.noConflict();

        expect(Interceptor).toBeUndefined();
        expect(InterceptorJS).toBeDefined();
    });

    it('can be called with a name argument', function() {
        expect(Interceptor).toBeDefined();

        Interceptor.noConflict('FooBarBazQux');

        expect(Interceptor).toBeUndefined();
        expect(FooBarBazQux).toBeDefined();
    });

});
