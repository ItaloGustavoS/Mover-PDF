// Unit tests for black.type module

const type = require('../src/type');
const { assert, refute, test } = require('claire'); // import all needed functions from claire as named imports

// Type checking
test('type:: Type checking : class_of -> String', () => {
  const class_of = type.class_of;

  assert.equal(class_of(0), 'Number');
  assert.equal(class_of(new Number(0)), 'Number');
  assert.equal(class_of(NaN), 'Number');
  assert.equal(class_of(false), 'Boolean');
  assert.equal(class_of(new Boolean(false)), 'Boolean');
  assert.equal(class_of('foo'), 'String');
  assert.equal(class_of(new String('foo')), 'String');
  assert.equal(class_of(/foo/), 'RegExp');
  assert.equal(class_of(new RegExp('foo')), 'RegExp');
  assert.equal(class_of([]), 'Array');
  assert.equal(class_of(new Array()), 'Array');
  assert.equal(class_of({}), 'Object');
  assert.equal(class_of(new Object()), 'Object');
  assert.equal(class_of(class_of), 'Function');
  assert.equal(class_of(new Function), 'Function');
  assert.equal(class_of(new Date), 'Date');
  assert.equal(class_of(arguments), 'Arguments');
});

test('type:: Type checking : nilp -> Bool', () => {
  const nilp = type.nilp;

  assert(nilp(null));
  assert(nilp(undefined));
  refute(nilp(false));
  refute(nilp(0));
  refute(nilp(''));
  refute(nilp(NaN));
});

test('type:: Type checking : not_nilp -> Bool', () => {
  const not_nilp = type.not_nilp;

  assert(not_nilp(0));
  assert(not_nilp(false));
  assert(not_nilp(''));
  assert(not_nilp(NaN));
  refute(not_nilp(null));
  refute(not_nilp(undefined));
});

test('type:: Type checking : undefp -> Bool', () => {
  const undefp = type.undefp;

  assert(undefp(undefined));
  refute(undefp(null));
  refute(undefp(0));
  refute(undefp(false));
  refute(undefp(''));
  refute(undefp(NaN));
});

test('type:: Type checking : strp -> Bool', () => {
  const strp = type.strp;

  assert(strp(''));
  assert(strp(new String('')));
});

test('type:: Type checking : nump -> Bool', () => {
  const nump = type.nump;

  assert(nump(0));
  assert(nump(new Number(0)));
});

test('type:: Type checking : regexpp -> Bool', () => {
  const regexpp = type.regexpp;

  assert(regexpp(/foo/));
  assert(regexpp(new RegExp('foo')));
});

test('type:: Type checking : fnp -> Bool', () => {
  const fnp = type.fnp;

  assert(fnp(fnp));
  assert(fnp(new Function));
});

test('type:: Type checking : boolp -> Bool', () => {
  const boolp = type.boolp;

  assert(boolp(true));
  assert(boolp(false));
  assert(boolp(new Boolean(true)));
  assert(boolp(new Boolean(false)));

  refute(boolp(0));
  refute(boolp(''));
  refute(boolp(null));
  refute(boolp(undefined));
  refute(boolp(NaN));
});

test('type:: Type checking : objp -> Bool', () => {
  const objp = type.objp;

  refute(objp(''));
  refute(objp(null));
  refute(objp(undefined));
  refute(objp(NaN));
  refute(objp(0));
  refute(objp(false));
  refute(objp(true));

  assert(objp(new String));
  assert(objp(new Boolean));
  assert(objp(new Number));
  assert(objp([]));
  assert(objp(objp));
  assert(objp(arguments));
  assert(objp({}));
  assert(objp(/foo/));
});

// Interface testing
test('type:: Interface testing : callablep -> Bool', () => {
  const callablep = type.callablep;
  let callable_regexp = false;
  try { /foo/('foo'); callable_regexp = true; } catch (e) { }

  assert(callablep(callablep));
  assert(callablep(new Function));
  if (callable_regexp) assert(callablep(/foo/));
});

test('type:: Interface testing : numericp -> Bool', () => {
  const numericp = type.numericp;

  assert(numericp(0));
  assert(numericp(new Number(0)));
  assert(numericp('0'));
  assert(numericp('12'));
  assert(numericp([0]));
  assert(numericp(new String('12')));

  refute(numericp(NaN));
  refute(numericp('foo'));
  refute(numericp([1, 2]));
});

test('type:: Interface testing : sequencep -> Bool', () => {
  const sequencep = type.sequencep;

  assert(sequencep('foo'));
  assert(sequencep([1, 2, 3]));
  assert(sequencep({0:1,length:1}
