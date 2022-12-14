'use strict'

const indentSize = 2

module.exports = class Serializer {
    constructor(indentSize) {
        this.indentSize = indentSize || 2
    }

    serialize(obj, name = 'arg', indent= 0, seen = []) {
        const spaces = " ".repeat(indentSize*indent)

        // Process null, undefined and NaN
        if (typeof obj === 'undefined') {
            console.log(`${spaces}${name} = undefined`)
            return
        }

        if (obj === null) {
            console.log(`${spaces}${name} = null`)
            return
        }

        // Process Objects
        if (typeof obj === 'object') {
            if (seen.includes(obj)) {
                // cycle found
                return
            }

            seen.push(obj)

            // Process Arrays
            if (Array.isArray(obj)) {
                console.log(`${spaces}${name} = [`)
                obj.forEach((val, idx) => {
                    this.serialize(val, idx,indent + 1, seen)
                })
                console.log(`${spaces}]`)

                return
            }

            // Process Date
            if (obj instanceof Date) {
                console.log(`${spaces}${name} = ${obj.toDateString()}`)
                return
            }

            // Process Plain Objects
            console.log(`${spaces}${name} = {`)
            Object.getOwnPropertyNames(obj).forEach(k => {
                this.serialize(obj[k], k, indent + 1, seen)
            })
            console.log(`${spaces}}`)
            return
        }
        if (typeof obj === 'boolean') {
            console.log(`${spaces}${name} = ${obj.toString()}`)
        }

        // Process Primitives
        if (typeof obj === 'string') {
            console.log(`${spaces}${name} = "${obj}"`)
            return
        }

        if (typeof obj === 'number') {
            console.log(`${spaces}${name} =  ${obj}`)
            return
        }

        // Process whatever is left
        try {
            console.log(`${spaces}${name} = ${obj.toString()}`)
        } catch (err) {
            console.error('Object is not serializable')
        }
    }
}
