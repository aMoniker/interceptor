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

    afterEach(function() {
        (Interceptor || InterceptorJS || FooBarBazQux).init(true);
        InterceptorJS = undefined;
        FooBarBazQux = undefined;
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
        Interceptor.init(true);
        Interceptor.clearFilters();
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

describe('Interceptor filters can be cleared', function() {

    beforeEach(function() {
        Interceptor.init(true);
    });

    it('can clear all its filters', function() {
        expect(Interceptor.addFilter('foo.bar', function() {})).toBe(true);
        expect(Interceptor.filters['foo.bar']).toBeDefined();
        expect(Interceptor.filtersIndex['foo.bar']).toBeDefined();

        Interceptor.clearFilters();

        expect(Interceptor.filters['foo.bar']).toBeUndefined();
        expect(Interceptor.filtersIndex['foo.bar']).toBeUndefined();
    });

});

describe('Interceptor filters can be applied', function() {

    beforeEach(function() {
        Interceptor.init(true);
        Interceptor.clearFilters();
    });

    it('and will return undefined for an undefined filter with no arguments', function() {
        expect(Interceptor.applyFilter('foo.bar')).toBe(undefined);
    });

    it('and will return the first argument for a filter that is not defined', function() {
        expect(Interceptor.applyFilter('foo.bar', 'qux')).toBe('qux');
    });

    it('and will let me apply a filter that has been added', function() {
        expect(Interceptor.addFilter('foo.bar', function() { return 'baz'; })).toBe(true);
        expect(Interceptor.applyFilter('foo.bar', 'qux')).toBe('baz');
    });

    it('and will chain the results of applying filters', function() {
        expect(Interceptor.addFilter('foo.bar', function(total) {
            return total + 1;
        })).toBe(true);
        expect(Interceptor.addFilter('foo.bar', function(total) {
            return total + 2;
        })).toBe(true);
        expect(Interceptor.addFilter('foo.bar', function(total) {
            return total + 3;
        })).toBe(true);

        expect(Interceptor.applyFilter('foo.bar', 0)).toBe(6);
    });

    it('and will retain the bound context of a callback', function() {
        var callback = $.proxy(function() { return this.baz; }, { baz: 'qux' });
        expect(Interceptor.addFilter('foo.bar', callback)).toBe(true);
        expect(Interceptor.applyFilter('foo.bar')).toBe('qux');
    });

    it('and will let me specify the order of filters', function() {
        expect(Interceptor.addFilter('foo.bar', function(s) {
            return s + 'foo';
        }, 1000)).toBe(true);
        expect(Interceptor.addFilter('foo.bar', function(s) {
            return s + 'bar';
        }, -20)).toBe(true);
        expect(Interceptor.addFilter('foo.bar', function(s) {
            return s + 'baz';
        }, 57)).toBe(true);

        expect(Interceptor.applyFilter('foo.bar', '')).toBe('barbazfoo');
    });

});
