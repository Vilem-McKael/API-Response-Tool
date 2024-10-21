const util = require('util')
const os = require('os')
const { responseInput, structInput } = require('../data')


// ------------------------------------ STRUCT FUNCTIONS ------------------------------------

function analyzeStruct(structCode) {
    console.log(structCode)
    let structs = {}
}

function breakdownStructInput(structCode) {
    let stringified = JSON.stringify(structCode)
    // console.log(stringified)
    let splitData = stringified.split('\\n')
    // console.log(util.inspect(splitData, {maxArrayLength: null}))
    let twiceSplitData = splitData.map((line) => {
        let trimmedLine = line.trim()
        let splitLine = trimmedLine.split(' ')

        return splitLine
    });
    let filtered = twiceSplitData.filter((el) => el[0] !== '' && el[0] !== '"')
    // console.log(util.inspect(twiceSplitData, {maxArrayLength: null}))
    console.log(util.inspect(filtered, {maxArrayLength: null}))

    return filtered

}

function organizeStructInput(structInput) {
    
    const structMap = {}
    let currentStruct = null

    for (const line of structInput) {
        if (Array.isArray(line)) {
            const keyword = line[0]
            if (typeof keyword === 'string') {
                if (keyword === 'struct') {
                    const structName = line[1].replace(':', "")
                    structMap[structName] = {}
                    currentStruct = structName
                } else if (keyword === 'var') {
                    const varName = line[1].replace(':', '')
                    const type = line[2]
                    structMap[currentStruct][varName] = type
                } else if (keyword === '}') {
                    currentStruct = null
                }
            }
        }

        
        // console.log(stringified)
    }

    let stringified = JSON.stringify(structMap)
    return [structMap, stringified]
    // console.log(util.inspect(structMap, {maxArrayLength:null, depth:null, maxStringLength: null}))
    // console.log(util.inspect(stringified, {maxArrayLength:null, depth:null, maxStringLength: null}))

}

const staticTypes = [
    "String",
    "String?",
    "Int",
    "Int?",
    "Float",
    "Float?",
    "Bool",
    "Bool?"
]

function recursiveStructPopulator(structMap, structName) {
    // console.log(structMap)
    let currentObj = {};
    if (!structMap[structName]) {
        console.error(`Struct ${structName} is not found in structMap`);
        return {}; // return an empty object or handle the error appropriately
    }
    console.log('Struct found:', structMap[structName]);
    for (const [key, val] of Object.entries(structMap[structName])) {
        console.log('key: ', key, 'val: ', val)
        if (typeof val === 'string') {
            if (staticTypes.includes(val)) {
                console.log('Static type: ', val)
                currentObj[key] = val
            } else {
                console.log('New Struct to populate')
                let newStructName = val
                console.log('Struct name starts as: ', newStructName)
                if (newStructName.charAt(newStructName.length - 1) === '?') {
                    // handle optionals
                    newStructName = newStructName.slice(0, newStructName.length - 1)
                }
                console.log('Struct name is now (2): ', newStructName)
                console.log('Char at 0', newStructName.charAt(0))
                if (newStructName.charAt(0) === '[') {
                    newStructName = newStructName.slice(1, newStructName.length - 1)
                    console.log('Struct name is now (3): ', newStructName)
                    currentObj[key] = [recursiveStructPopulator(structMap, newStructName)]
                } else {
                    currentObj[key] = recursiveStructPopulator(structMap, newStructName)
                }
            }
        }
        
    }
    return currentObj
}

exports.analyzeStruct = analyzeStruct
exports.breakdownStruct = breakdownStructInput
exports.organizeStruct = organizeStructInput
exports.recursiveStructPopulator = recursiveStructPopulator