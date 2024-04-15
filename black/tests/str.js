////////////////////////////////////////////////////////////////////////////////
// Unit tests for the black.str module
//

const str = require('../src/str')
const claire = require('claire')
const test = claire.test
const describe = claire.describe
const assert = claire.assert
const refute = claire.refute
const beforeEach = claire.beforeEach

describe('str module', function() {
  let makeStr, cat, capitalise, startsWithp, endsWithp, hasp, count, dasherise, camelise

  beforeEach(function() {
    makeStr = str.make_str
    cat = str.cat
    capitalise = str.capitalise
    startsWithp = str.starts_withp
    endsWithp = str.ends_withp
    hasp = str.hasp
    count = str.count
    dasherise = str.dasherise
    camelise = str.camelise
  })

  test('make_str function', function() {
    assert(makeStr('foo') === '', 'make_str("foo") should return ""')
    assert(makeStr('foo', 2) === 'foofoo', 'make_str("foo", 2) should return "foofoo"')
    assert(makeStr('foo', 1) === 'foo', 'make_str("foo", 1) should return "foo"')
    assert(makeStr('foo', -1) === '', 'make_str("foo", -1) should return ""')
    assert(makeStr('foo', 0) === '', 'make_str("foo", 0) should return ""')

    assert(makeStr(['foo', 'bar'], 2) === 'foo,barfoo,bar', 'make_str(["foo", "bar"], 2) should return "foo,barfoo,bar"')
    assert(makeStr(42, 2) === '4242', 'make_str(42, 2) should return "4242"')
    assert(makeStr({}, 2) === '[object Object][object Object]', 'make_str({}, 2) should return "[object Object][object Object]"')
  })

  test('cat function', function() {
    assert(cat() === '', 'cat() should return ""')
    assert(cat('a',1,[2],{3:4}) === 'a12[object Object]', 'cat("a",1,[2],{3:4}) should return "a12[object Object]"')
  })

  test('capitalise function', function() {
    assert(capitalise('---the. first.') === '---The. first.', 'capitalise("---the. first.") should return "---The. first."')
    assert(capitalise('---the. first.', true) === '---The. First.', 'capitalise("---the. first.", true) should return "---The. First."')
    assert(capitalise('-Fo:b&ar. bAZ.', true) === '-Fo:B&Ar. Baz.', 'capitalise("-Fo:b&ar. bAZ.", true) should return "-Fo:B&Ar. Baz."')
  })

  test('starts_withp function', function() {
    assert(startsWithp('foobar', 'foo'), 'starts_
