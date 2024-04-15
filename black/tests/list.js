const list = require('../src/list')
const { assert, refute, eq, deepEq } = require('claire')

describe('list', () => {
  // Making lists
  test('make_array', () => {
    assert(list.make_array(0) <eq> [])
    assert(list.make_array(-1) <eq> [])
    assert(list.make_array(1) <eq> [''])
    assert(list.make_array(3) <eq> ['', '', ''])
    assert(list.make_array(1, 0) <eq> [0])
    assert(list.make_array(3, null) <eq> [null, null, null])
    assert(list.make_array(1, undefined) <eq> [undefined])
    assert(list.make_array(1, list.make_array) <eq> [list.make_array])
  })

  test('range', () => {
    assert(list.range(0, 0) <eq> [])
    assert(list.range(0, 2) <eq> [0, 1])
    assert(list.range(5, 9) <eq> [5, 6, 7, 8])
    assert(list.range(0, 10, 2) <eq> [0, 2, 4, 6, 8])
    assert(list.range(0, 3, 5) <eq> [0])
  })

  test('to_array', () => {
    assert(list.to_array() <eq> [])
    assert(list.to_array(null) <eq> [])
    assert(list.to_array(false) <eq> [])
    assert(list.to_array(true) <eq> [])
    assert(list.to_array(42) <eq> [])
    assert(list.to_array(/foo/) <eq> [])
    assert(list.to_array(list.to_array) <eq> [list.to_array])
    assert(list.to_array('foo') <eq> ['f', 'o', 'o'])
    assert(list.to_array(new String('foo')) <eq> ['f', 'o', 'o'])
    assert(deepEq(list.to_array(seq), [1, 2, 3, 4]))
  })

  test('copy', () => {
    assert(list.copy() <eq> [])
    assert(list.copy(null) <eq> [])
    assert(list.copy(42) <eq> [])
    assert(list.copy(/foo/) <eq> [])
    assert(list.copy('foo') <eq> ['f', 'o', 'o'])
    assert(deepEq(list.copy(seq), [1, 2, 3, 4]))
    assert(deepEq(list.copy([1, 2]), [1, 2]))

    const nested = [1, [2, [3, [4]]]]
    const other = list.copy(nested)
    assert(other <eq> [1, [2, [3, [4]]]])
    other[1][0] = 5
    assert(other <eq> [1, [5, [3, [4]]]])

    const sparse = [1, , 2, , 3, , 4]
    const sparse_seq = { 0: 1, 2: 2, 4: 3, 6: 4, length: 7 }
    assert(deepEq(list.copy(sparse), sparse))
    assert(deepEq(list.copy(sparse_seq), sparse_seq))
  })

  // List information
  test('size', () => {
    assert(list.size([]) <eq> 0)
    assert(list.size({}) <eq> 0)
    assert(list.size() <eq> 0)
    assert(list.size(1) <eq> 0)
    assert(list.size(null) <eq> 0)
    assert(list.size(true) <eq> 0)
    assert(list.size(false) <eq> 0)
    assert(list.size(/foo/) <eq> 0)
    assert(list.size(seq) <eq> 4)
    assert(list.size('foo') <eq> 3)
    assert(list.size([1]) <eq> 1)
    assert(list.size([1, 2]) <eq> 2)
  })

  test('empty?', () => {
    refute(list.empty([]))
    refute(list.empty({}))
    refute(list.empty(seq))
    refute(list.empty('foo'))
    refute(list.empty([1]))
    refute(list.empty([1, 2]))
    assert(list.empty(null))
    assert(list.empty(0))
    assert(list.empty(undefined))
    assert(list.empty(false))
    assert(list.empty(true))
    assert(list.empty(/foo/))
  })

  test('has?', () => {
    assert(list.has(1, seq))
    assert(list.has(2, [1, 2]))
    assert(list.has('o', 'foo'))
    refute(list.has('x', 'foo'))
    refute(list.has(1, [2, 3]))
    refute(list.has(1, { a: 1 }))
  })

  test('count', () => {
    assert(list.count(2, [1, 2, 2, 3]) <eq> 2)
    assert(
