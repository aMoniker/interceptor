describe('Interceptor exists', function() {

    it('exists as a global object', function() {
        expect(Interceptor).toBeDefined();
        expect(Interceptor).toBeTruthy();
    });

    it('has a defined version', function() {
        expect(Interceptor.version).toBeDefined();
        expect(Interceptor.version).toEqual(jasmine.any(String));
    });

    it('has API functions available', function() {
        var api = ['addFilter', 'applyFilter', 'removeFilter'];

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
