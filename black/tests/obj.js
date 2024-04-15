// src/obj.js

module.exports = {
  hasp: function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  },
  emptyp: function(obj) {
    return Object.keys(obj).length === 0;
  },
  size: function(obj) {
    return Object.keys(obj).length;
  },
  values: function(obj) {
    return Object.values(obj);
  },
  items: function(obj) {
    return Object.entries(obj);
  },
  get: function(obj, key, defaultValue) {
    return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
  },
  set_default: function(obj, key, defaultValue) {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = defaultValue;
    }
    return obj[key];
  },
  nextend: function(obj, props) {
    const newObj = Object.assign({}, obj, props);
    Object.keys(obj).forEach(key => {
      if (props.hasOwnProperty(key)) {
        obj[key] = props[key];
      }
    });
    return newObj;
  },
  extend: function(target, source) {
    Object.keys(source).forEach(key => {
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    });
  },
};


// test/obj.spec.js

const obj = require('../src/obj');
const assert = require('assert');

describe('obj module', function() {
  let foo, bar;

  beforeEach(function() {
    foo = { bar: 'baz' };
    bar = Object.create(foo);
    bar.baz = 'foo';
  });

  afterEach(function() {
    delete global.foo;
    delete global.bar;
  });

  describe('hasp', function() {
    it('should return true if the object has the given property', function() {
      assert(obj.hasp(foo, 'bar'));
      assert(obj.hasp(bar, 'baz'));
      assert(!obj.hasp(bar, 'bar'));
    });
  });

  describe('emptyp', function() {
    it('should return true if the object has no properties', function() {
      assert(!obj.emptyp(foo));
      assert(!obj.emptyp(bar));
      assert(obj.emptyp({}));
      assert(obj.emptyp(Object.create(null)));
    });
  });

  describe('size', function() {
    it('should return the number of properties in the object', function() {
      assert(obj.size(foo) === 1);
      assert(obj.size(bar) === 1);
      assert(obj.size({}) === 0);
      assert(obj.size(Object.create(foo)) === 0);
    });
  });

  describe('values', function() {
    it('should return an array of the object values', function() {
      assert(obj.values(foo).includes('baz'));
      assert(obj.values(bar).includes('foo'));
      assert(obj.values({})
