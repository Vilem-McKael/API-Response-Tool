const util = require('util')
const os = require('os')
const { responseInput, structInput } = require('../data')

function nilCheck(input) {
    return (input === 'nil' || input === 'null' || input === 'Undefined' || input === 'undefined')
}

function typeCompare(type, input) {
    switch (type) {
        
    case 'String':
        return typeof input === 'string' && (input.includes("'") || input.includes('"') || input.includes('`') )
    case 'String?':
        return (typeof input === 'string' && (input.includes("'") || input.includes('"')) || input.includes('`')) || nilCheck(input)
    case 'Float':
        if (nilCheck(input)) {
            return false
        } else {
            if (typeof input === 'number' && !Number.isInteger(input)) {
                return true
            } else {
                return false
            }
        }
        return false
    case 'Float?':
        if (nilCheck(input)) {
            return true
        } else {
            if (typeof input === 'number' && !Number.isInteger(input)) {
                return true
            }
            return false
        }
    case 'Int':
        if (nilCheck(input)) {
            return false 
        } else {
            if (typeof input === 'number' && Number.isInteger(input)) {
                return true
            } else if (typeof input === 'bigint') {
                return true
            } else {
                return false
            }
        }
    case 'Int?':
        if (nilCheck(input)) {
            return true
        } else {
            
            if (input.includes('.')) {
                return false
            }
            let parsed = Number.parseInt(input) ?? null
            if (typeof parsed === 'number') {
                if (Number.isInteger(input)) {
                    return true
                }
            } else if (typeof parsed === 'bigint') {
                return true
            }
            return false
            
        }
    case 'Bool':
        return typeof input === 'boolean'
    case 'Bool?': 
        if (nilCheck(input)) {
            return true
        } else {
            return typeof input === 'boolean'
        }
    }
}

function typeCheck(input) {
    switch(typeof input) {
    case 'string':
        if (nilCheck(input)) {
            return 'Nil'
        }
        return 'String'
    case 'number':
        if (Number.isInteger(input)) {
            return 'Int'
        } else {
            return 'Float'
        }
    case 'bigint':
        return 'Int'
    case 'boolean':
        return 'Bool'
    case 'undefined':
        return 'Nil'
    }
        
}

function mergeIfOptional(type1, type2) {

    if (type1 === 'Nil' || type2 === 'Nil') {
        console.log('One is nil: ', type1, type2)
    }

    
    if (typeof type1 === 'string' && typeof type2 === 'string') {

        if (type1.startsWith('Incompatible')) {
            return type1
        } else if (type2.startsWith('Incompatible')) {
            return type2
        }
    
        // If the types are the same
        if (type1 === type2) {
            return type1

        // If one is an optional already and one is not

        // If type1 is the optional version of type2
        } else if (type1.endsWith('?') || type2.endsWith('?')) {

            return type1.endsWith('?') ? type1 : type2

        // Else if the types are not the same && one is not the optional version of the other
        } else {
            console.log(`Entered desired merge section: type1 = ${type1}   type2 = ${type2}`)
            if (type1 === 'Nil') {
                switch(type2) {
                    case 'String':
                        return 'String?'
                    case 'String?':
                        return 'String?'
                    case 'Int':
                        return 'Int?'
                    case 'Int?':
                        return 'Int?'
                    case 'Float':
                        return 'Float?'
                    case 'Float?':
                        return 'Float?'
                    case 'Bool':
                        return 'Bool?'
                    case 'Bool?':
                        return 'Bool?'
                    case 'Nil':
                        return 'Nil'
                    default:
                        try {
                            throw new Error('Type1 or type2 is not a string, and is thus not compatible with this function:', type1, type2)
                        } catch (err) {
                            console.log(err)
                        }
                        
                        return 'Incompatible' + type1 + type2
                }
            } else if (type2 === 'Nil') {
                switch(type1) {
                    case 'String':
                        return 'String?'
                    case 'String?':
                        return 'String?'
                    case 'Int':
                        return 'Int?'
                    case 'Int?':
                        return 'Int?'
                    case 'Float':
                        return 'Float?'
                    case 'Float?':
                        return 'Float?'
                    case 'Bool':
                        return 'Bool?'
                    case 'Bool?':
                        return 'Bool?'
                    case 'Nil':
                        return 'Nil'
                    default:
                        try {
                            throw new Error('Type1 or type2 is not a string, and is thus not compatible with this function:', type1, type2)
                        } catch (err) {
                            console.log(err)
                        }
                        
                        return 'Incompatible' + type1 + type2
                }
            } else {
                try {
                    throw new Error('Type1 and type2 are incompatible:', type1, type2)
                } catch (err) {
                    console.log(err)
                }
                
                return 'Incompatible' + type1 + type2
            }
        }
    } else {
        try {
            throw new Error('Type1 or type2 is not a string, and is thus not compatible with this function:')
        } catch (err) {
            console.log(err, type1, type2)
        }
        
        return 'Incompatible' + type1 + type2
    }
}

exports.typeCheck = typeCheck
exports.typeCompare = typeCompare
exports.mergeIfOptional = mergeIfOptional