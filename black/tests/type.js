// Unit tests for black.type module

const type = require('../src/type')
const { assert, refute } = require('claire') // import assert and refute from claire as a named import
const test = require('claire').test // import test from claire as a default import

// Type checking
test('type:: Type checking : class_of -> String', function() {
    const class_of = type.class_of

    assert(class_of(0) === 'Number')
    assert(class_of(new Number(0)) === 'Number')
    assert(class_of(NaN) === 'Number')
    assert(class_of(false) === 'Boolean')
    assert(class_of(new Boolean(false)) === 'Boolean')
    assert(class_of('foo') === 'String')
    assert(class_of(new String('foo')) === 'String')
    assert(class_of(/foo/) === 'RegExp')
    assert(class_of(new RegExp('foo')) === 'RegExp')
    assert(class_of([]) === 'Array')
    assert(class_of(new Array) === 'Array')
    assert(class_of({}) === 'Object')
    assert(class_of(new Object) === 'Object')
    assert(class_of(class_of) === 'Function')
    assert(class_of(new Function) === 'Function')
    assert(class_of(new Date) === 'Date')
    assert(class_of(arguments) === 'Arguments')
})

test('type:: Type checking : nilp -> Bool', function() {
    const nilp = type.nilp

    assert(nilp(null))
    assert(nilp(undefined))
    refute(nilp(false))
    refute(nilp(0))
    refute(nilp(''))
    refute(nilp(NaN))
})

test('type:: Type checking : not_nilp -> Bool', function() {
    const not_nilp = type.not_nilp

    assert(not_nilp(0))
    assert(not_nilp(false))
    assert(not_nilp(''))
    assert(not_nilp(NaN))
    refute(not_nilp(null))
    refute(not_nilp(undefined))
})

test('type:: Type checking : undefp -> Bool', function() {
    const undefp = type.undefp

    assert(undefp(undefined))
    refute(undefp(null))
    refute(undefp(0))
    refute(undefp(false))
    refute(undefp(''))
    refute(undefp(NaN))
})

test('type:: Type checking : strp -> Bool', function() {
    const strp = type.strp

    assert(strp(''))
    assert(strp(new String('')))
})

test('type:: Type checking : nump -> Bool', function() {
    const nump = type.nump

    assert(nump(0))
    assert(nump(new Number(0)))
})

test('type:: Type checking : regexpp -> Bool', function() {
    const regexpp = type.regexpp

    assert(regexpp(/foo/))
    assert(regexpp(new RegExp('foo')))
})

test('type:: Type checking : fnp -> Bool', function() {
    const fnp = type.fnp

    assert(fnp(fnp))
    assert(fnp(new Function))
})

test('type:: Type checking : boolp -> Bool', function() {
    const boolp = type.boolp

    assert(boolp(true))
    assert(boolp(false))
    assert(boolp(new Boolean(true)))
    assert(boolp(new Boolean(false)))

    refute(boolp(0))
    refute(boolp(''))
    refute(boolp(null))
    refute(boolp(undefined))
    refute(boolp(NaN))
})

test('type:: Type checking : objp -> Bool', function() {
    const objp = type.objp

    refute(objp(''))
    refute(objp(null))
    refute(objp(undefined))
    refute(objp(NaN))
    refute(objp(0))
    refute(objp(false))
    refute(objp(true))

    assert(objp(new String))
    assert(objp(new Boolean))
    assert(objp(new Number))
    assert(objp([]))
    assert(objp(objp))
    assert(objp(arguments))
    assert(objp({}))
    assert(objp(/foo/))
})

// Interface testing
test('type:: Interface testing : callablep -> Bool', function() {
    const callablep = type.callablep
    let callable_regexp = false
    try { /foo/('foo'); callable_regexp = true } catch(e) { }
    
    assert(callablep(callablep))
    assert(callablep(new Function))
    if (callable_regexp)
        assert(callablep(/foo/))
})

test('type:: Interface testing : numericp -> Bool', function() {
    const numericp = type.numericp

    assert(numericp(0))
    assert(numericp(new Number(0)))
    assert(numericp('0'))
    assert(numericp('   12'))
    assert(numericp([0]))
    assert(numericp(new String('12')))

    refute(numericp(NaN))
    refute(numericp('foo'))
    refute(numericp([1, 2]))
})

test('type:: Interface testing : sequencep -> Bool', function() {
    const sequencep = type.sequencep

    assert(sequencep('foo'))
    assert(sequencep([1, 2, 3]))
    assert(sequencep({0:1,length:1}))
    assert(sequencep(arguments))
    assert
