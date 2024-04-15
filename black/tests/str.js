// Unit tests for the str module

const str = require('../src/str')
const test = require('claire/test')
const describe = require('claire/describe')
const assert = require('claire/assert')
const refute = require('claire/refute')
const beforeEach = require('claire/beforeEach')

describe('str module', () => {
  let makeStr, cat, capitalise, startsWithp, endsWithp, hasp, count, dasherise, camelise

  beforeEach(() => {
    makeStr = str.makeStr
    cat = str.cat
    capitalise = str.capitalise
    startsWithp = str.starts_withp
    endsWithp = str.ends_withp
    hasp = str.hasp
    count = str.count
    dasherise = str.dasherise
    camelise = str.camelise
  })

  test('makeStr function', () => {
    assert(makeStr('foo') === '', 'makeStr("foo") should return ""')
    assert(makeStr('foo', 2) === 'foofoo', 'makeStr("foo", 2) should return "foofoo"')
    assert(makeStr('foo', 1) === 'foo', 'makeStr("foo", 1) should return "foo"')
    assert(makeStr('foo', -1) === '', 'makeStr("foo", -1) should return ""')
    assert(makeStr('foo', 0) === '', 'makeStr("foo", 0) should return ""')

    assert(makeStr(['foo', 'bar'], 2) === 'foo,barfoo,bar', 'makeStr(["foo", "bar"], 2) should return "foo,barfoo,bar"')
    assert(makeStr(42, 2) === '4242', 'makeStr(42, 2) should return "4242"')
    assert(makeStr({}, 2) === '[object Object][object Object]', 'makeStr({}, 2) should return "[object Object][object Object]"')
  })

  test('cat function', () => {
    assert(cat() === '', 'cat() should return ""')
    assert(cat('a', 1, [2], {3: 4}) === 'a12[object Object]', 'cat("a",1,[2],{3:4}) should return "a12[object Object]"')
  })

  test('capitalise function', () => {
    assert(capitalise('---the. first.') === '---The. first.', 'capitalise("---the. first.") should return "---The. first."')
    assert(capitalise('---the. first.', true) === '---The. First.', 'capitalise("---the. first.", true) should return "---The. First."')
    assert(capitalise('-Fo:b&ar. bAZ.', true) === '-Fo:B&Ar. Baz.', 'capitalise("-Fo:b&ar. bAZ.", true) should return "-Fo:B&Ar. Baz."')
  })

  test('starts_withp function', () => {
    assert(startsWithp('foobar', 'foo'), 'starts_withp("foobar", "foo") should return true')
    assert(!startsWithp('foobar', 'bar'), "starts_withp('foobar', 'bar') should return false")
  })

  // Add tests for the remaining functions (endsWithp, hasp, count, dasherise, camelise)
})
