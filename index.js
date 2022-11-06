'use strict'

const Serializer = require('./Serializer')

const serializer = new Serializer()

const test = {
    v: 'A value',
    n: 123,
    t: true,
    f: false,
    d: new Date(),
    arr: [
        1, 2, 3, { nested: {object: true}},
    ]
}

const cycle = ['a', 'b', test]

test.cycle = cycle

serializer.serialize(test)
console.log('-------------------------')
serializer.serialize(cycle)
