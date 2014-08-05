Interceptor
===========

[![Build Status](https://travis-ci.org/aMoniker/interceptor.svg?branch=master)](https://travis-ci.org/aMoniker/interceptor)

An implementation of the [Intercepting Filter](http://www.corej2eepatterns.com/InterceptingFilter.htm) pattern for javascript.

API
---
#### addFilter(name, callback, order)

You can add a filter for a given name using `addFilter`. The name is just a string, so use whatever you like. The callback can accept any number of arguments, and the ones it receives will depend on which arguments are passed when the filter is invoked by `applyFilter`.

The `callback` function should always return a value. Usually it would be some modified form of the first argument to the callback.

The `order` argument is optional, and defaults to **10**. Filters will always be processed according to the order you give them.

`Interceptor.addFilter('filter.name', function(all, your, args) { ... }, order);`

#### applyFilter(name, ...arguments)

Once filters have been added, you can use them with `applyFilter`. Call it with a given `name` and any number of arguments in order to give any filters a chance to act on it, and return a modified version.

`var filtered = Interceptor.applyFilter('filter.name', foo, bar, baz);`

You can call it without any filters having been defined, and it will just return the first argument to `applyFilter` after the `name`.

Filters are cumulative, so having several defined means that subsequent filters receive the modified first argument from previous filters.

#### removeFilter(name, callback, order)

The `name` argument is required, but the `callback` and `order` arguments are optional. It will only remove filters meeting all the criteria of the arguments you pass in. If you want to pass `order` without passing `callback`, just pass `null` or `undefined` in place of `callback`.

#### clearFilters()

Completely removes all filters.

#### noConflict(name)

There's also a noConflict mode in case you're already using the name `Interceptor` as a global. Just after you load `interceptor.min.js`, call `Interceptor.noConflict('SomeOtherName')` and the `Interceptor` global will be cleared and `SomeOtherName` will contain a reference to the library instead. If you don't give it a name, the default is `InterceptorJS`.