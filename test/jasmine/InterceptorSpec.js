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

describe('Interceptor filters can be added', function() {

    var test_name = 'foo.bar';
    var test_name2 = 'baz.qux';
    var test_callback = function() { return 'foo'; };
    var test_callback2 = function() { return 'bar'; };
    var test_order = 1337;
    var test_order2 = 42;

    var check_for_filter = function(name, callback, order) {
        expect(Interceptor.filters[name]).toBeDefined();
        expect(Interceptor.filters[name][order]).toBeDefined();
        expect(Interceptor.filters[name][order]).toContain(callback);
        expect(Interceptor.filtersIndex[name]).toBeDefined();
        expect(Interceptor.filtersIndex[name]).toContain(order);
    };

    beforeEach(function() {
        (Interceptor || InterceptorJS || FooBarBazQux).init(true);
    });

    it('will throw an exception when a name isnt present', function() {
        expect(function() {
            Interceptor.addFilter();
        }).toThrow();
    });

    it('will throw an exception when an invalid name is given', function() {
        expect(function() {
            Interceptor.addFilter(123456789, function(){});
        }).toThrow();
    });

    it('will throw an exception when a callback isnt given', function() {
        expect(function() {
            Interceptor.addFilter(test_name);
        }).toThrow();
    });

    it('will throw an exception when a callback isnt valid', function() {
        expect(function() {
            Interceptor.addFilter(test_name, 'blahblah');
        }).toThrow();
    });

    it('will throw an exception when the order isnt valid', function() {
        expect(function() {
            Interceptor.addFilter(test_name, function(){}, 'blah');
        }).toThrow();
    });

    it('will let me add a filter without specifying an order', function() {
        expect(Interceptor.addFilter(test_name, test_callback)).toBe(true);
        check_for_filter(test_name, test_callback, 10);
    });

    it('will let me add a filter using a specific order', function() {
        expect(Interceptor.addFilter(test_name, test_callback, test_order)).toBe(true);
        check_for_filter(test_name, test_callback, test_order);
    });

    it('will let me add filters with the same name and different orders', function() {
        expect(Interceptor.addFilter(test_name, test_callback, test_order)).toBe(true);
        expect(Interceptor.addFilter(test_name, test_callback, test_order2)).toBe(true);
        check_for_filter(test_name, test_callback, test_order);
        check_for_filter(test_name, test_callback, test_order2);
    });

    it('will let me add filters with different names', function() {
        expect(Interceptor.addFilter(test_name, test_callback, test_order)).toBe(true);
        expect(Interceptor.addFilter(test_name2, test_callback, test_order)).toBe(true);
        check_for_filter(test_name, test_callback, test_order);
        check_for_filter(test_name2, test_callback, test_order);
    });

    it('will let me add filters with different callbacks', function() {
        expect(Interceptor.addFilter(test_name, test_callback, test_order)).toBe(true);
        expect(Interceptor.addFilter(test_name, test_callback2, test_order)).toBe(true);
        check_for_filter(test_name, test_callback, test_order);
        check_for_filter(test_name, test_callback2, test_order);
    });

});
