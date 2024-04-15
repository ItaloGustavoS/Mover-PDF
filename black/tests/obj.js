const hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = {
  has: function (obj, key) {
    return hasOwnProperty.call(obj, key);
  },

  isEmpty: function (obj) {
    return Object.keys(obj).length === 0;
  },

  size: function (obj) {
    return Object.keys(obj).length;
  },

  values: function (obj) {
    return Object.values(obj);
  },

  entries: function (obj) {
    return Object.entries(obj);
  },

  get: function (obj, key, defaultValue) {
    return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
  },

  setDefault: function (obj, key, defaultValue) {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = defaultValue;
    }
    return obj[key];
  },

  merge: function (target, source) {
    Object.keys(source).forEach(key => {
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    });
  },
};



const obj = require('../src/obj');
const assert = require('assert');

describe('obj module', function () {
  let foo, bar;

  beforeEach(function () {
    foo = { bar: 'baz' };
    bar = Object.create(foo);
    bar.baz = 'foo';
  });

  afterEach(function () {
    delete global.foo;
    delete global.bar;
  });

  describe('has', function () {
    it('should return true if the object has the given property', function () {
      assert(obj.has(foo, 'bar'));
      assert(obj.has(bar, 'baz'));
      assert(!obj.has(bar, 'bar'));
    });
  });

  describe('isEmpty', function () {
    it('should return true if the object has no properties', function () {
      assert(!obj.isEmpty(foo));
      assert(!obj.isEmpty(bar));
      assert(obj.isEmpty({}));
      assert(obj.isEmpty(Object.create(null)));
    });
  });

  describe('size', function () {
    it('should return the number of properties in the object', function () {
      assert(obj.size(foo) === 1);
      assert(obj.size(bar) === 1);
      assert(obj.size({}) === 0);
      assert(obj.size(Object.create(foo)) === 0);
    });
  });

  describe('values', function () {
    it('should return an array of the object values', function () {
      assert(obj.values(foo).includes('baz'));
      assert(obj.values(bar).includes('foo'));
      assert(obj.values({})
