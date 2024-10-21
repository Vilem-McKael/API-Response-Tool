const util = require('util')
const os = require('os')
const fs = require('fs')
const { responseInput, structInput } = require('../data')
const {typeCheck, typeCompare, mergeIfOptional} = require('./type')


// ------------------------------------ JSON RESPONSE FUNCTIONS ------------------------------------

function breakdownResponse(response) {

    // Thanks chatgpt for helping me figure out how to replace newlines inside double quotes without replacing the others

    const newlinePlaceholder = '__NEWLINE__'

    // response = response.replace(/:\s?"([^"]*?)",/gs, (match, p1) => {
    //     // Replace only newlines inside the matched string (p1) with the placeholder
    //     const cleanedString = p1.replace(/\n\n/g, newlinePlaceholder);
    //     return `: \\"${cleanedString}\\",`;
    // }).replace(/:\s?"([^"]*?)",/gs, (match, p1) => {
    //     // Replace only newlines inside the matched string (p1) with the placeholder
    //     const cleanedString = p1.replace(/\n/g, newlinePlaceholder);
    //     return `: \\"${cleanedString}\\",`;
    // }).replace(/\r/g, '')
    // response = response.replace(/:\s?"([^"]*?)",/gs, (match, p1) => {
    //     // Replace only newlines inside the matched string (p1) with the placeholder
    //     const cleanedString = p1.replace(/\n/g, '');
    //     return `: \\"${cleanedString}\\",`;
    // }).replace(/\r/g, '')
    response = response.replace(/:\s?"([^"]*?)"/gs, (match, p1) => {
        // Replace only newlines inside the matched string (p1) with the placeholder
        const cleanedString = p1.replace(/\n/g, '');
        return `: \\"${cleanedString}\\"`;
    }).replace(/\r/g, '')
    // response.replace(/\r/g, '').replace(/\n/g, '')

    let response2 = util.inspect(response, {maxArrayLength: null, maxStringLength: null, depth: null})
    fs.writeFile('replaced2.txt', response2, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })
    
    // .replace(/:\s?"([^"]*?)",/gs, (match, p1) => {
    //     // Replace only newlines inside the matched string (p1) with the placeholder
    //     const cleanedString = p1.replace(/\r/g, ' ');
    //     return `: \\"${cleanedString}\\",`;
    // })

    let stringified = JSON.stringify(response)
    
    let splitData = stringified.split('\\n')
    let twiceSplitData = splitData.map((line) => {
        let trimmedLine = line.replace(/\\/g, '')
        trimmedLine = trimmedLine.replace(/,/g, '')
        trimmedLine = trimmedLine.trim()
        let splitLine = trimmedLine.split(" ") // ***** figure out how to do this without messing with string values
        // splitLine = splitLine.trim()
        
        if (splitLine[1] && splitLine[1] === ':'){
            splitLine.splice(1, 1)
            let originalString = splitLine.slice(1).join(' ').replace(new RegExp(newlinePlaceholder, 'g'), '\n')
            splitLine = [splitLine[0], originalString]
        }

        // if (splitLine[0]) {
        //     console.log("splitLine[0]:", splitLine[0] ?? null)
        //     console.log("char at last index:", splitLine[0].charAt(splitLine[0].length - 1))
        //     console.log("splitLine[0][splitline[0].length - 1]: ", splitLine[0][splitLine[0].length - 1])
        // }
        

        if (splitLine.length === 2 && splitLine[0].includes('"')) {
            if (splitLine[0][splitLine[0].length - 1] === '"') {
                splitLine[0] = splitLine[0].replace(/"/g, '')
                // splitLine[1] = splitLine[1].replace(/'/g, "").replace(/'"/g, "'").replace(/"'/g, "'").replace(/`"/g, '`').replace(/"`/g, '`')
                splitLine[1] = splitLine[1].replace()
            } else {
                splitLine.join(" ")
            }
        } 

        return splitLine
    })

    // console.log(util.inspect(twiceSplitData, {maxArrayLength: null}))
    return twiceSplitData

}

// RECURSION BITCHES
// RECURSIVE RESPONSE TRANSLATOR 2
// PARAMS:
// parentObjType: Refers to what type of object is being populated, either an array being pushed to or an object having key value pairs assigned to
// 

function parseJSON(data) {
    return recursiveJSONParser('object', data, 0)
}

function recursiveJSONParser(objType, data, currentIndex) {

    // console.log(`Entered new recursion.    objType: ${objType}    currentIndex: ${currentIndex}`)

    // According
    let currentObj;
    if (objType === 'object') {
        currentObj = {}
    } else if (objType === 'array') {
        currentObj = []
    }


    for (let i = currentIndex; i < data.length; i++) {

        // A single "line" of code being parsed
        const line = data[i]

        // SINGLE VAL LINES
        if (line.length === 1) {

            // {, [, }, or ] : Opening or closing an object or array
            const char = line[0]
            // console.log('Single Val Line. char: ', char) 
            
            // If opening an object
            if (char === '{' || char === '[') {
                let nextObjType;
                switch (char) {
                    case '{':
                        nextObjType = 'object'
                        break
                    case '[':
                        nextObjType = 'array'
                        break
                }

                const [result, endIndex] = recursiveJSONParser(nextObjType, data, i + 1)
                // Type will only be an object in this case when it's the first line of the response

                switch (objType) {
                    //
                    case 'array':
                        currentObj.push(result)
                        break
                    // This should be the finished object
                    case 'object':
                        throw new Error('This should not be possible')
                }

                // Jump to the index from which the recursive function left off
                // Next iteration will be endIndex + 1
                i = endIndex

            // If closing an object, return the object and the index from which to resume
            } else if (char === '}' || char === ']') {
                return [currentObj, i]
            } else if (objType === 'array') {
                currentObj.push(char)
            }


        // DOUBLE VAL LINES (key, value) pairs
        } else if (line.length === 2) {
            const key = line[0]
            const val = line[1]

            // console.log(`Double Val Line. key: ${key}    val: ${val}`)

            if (val === '{' || val === '[') {

                let nextObjType;

                switch (val) {
                    case '{':
                        nextObjType = 'object'
                        break
                    case '[':
                        nextObjType = 'array'
                        break
                }

                const [result, endIndex] = recursiveJSONParser(nextObjType, data, i + 1)

                switch (objType) {
                    //
                    case 'array':
                        currentObj.push(result)
                    // This should be the finished object
                    case 'object':
                        currentObj[key] = result
                }

                i = endIndex
            } else {
                currentObj[key] = val
            }
        } else if (line.length > 2) {

            console.log("----- OUTLIER -----", line)

        }
    }

    return currentObj

}

// console.log(util.inspect(parseJSON(responseInput), {maxArrayLength:null}))


// const brokenDownData = breakdownResponse(responseInput)

// organizeStructInput(breakdownStructInput(structInput))
// console.log(util.inspect(breakdownResponse(responseInput), {maxArrayLength:null}))

// console.log(util.inspect(parseJSON(brokenDownData), {maxArrayLength: null}))



function organizeResponse(data) {

    const responseObj = {}

    for (const line of data) {
        let keyword = line[0]

        if (line[0] === '{') {
            [responseObj, index] = recursiveResponseAnalysis()
        }

        if (line.length === 2) {
            let key = line[0]
            let val = line[1]
            if (val === '{') {
                // currentLayerIndex += 1
                layerTypeStack.push('object')
                layerNameStack.push(line[0])
            } else if (val === '[') {
                layerTypeStack.push('array')
                layerNameStack.push(line[0])
            } else {

            }
        }

        if (line.length > 2) {
            outliers.push(line)
        }
        
    }
}



// -------------------------------- RESPONSE TYPE CONVERTOR --------------------------------

// function convertToType(organizedResponse) {
//     const typeMap = {}
//     return recursiveTypeConverter(organizedResponse)
// }

function recursiveTypeConverter(objToAnalyze) {

    // This is the object that will be returned
    let currentObj = {}

    console.log('Begin new recursion.')
    console.log(util.inspect(objToAnalyze, {maxArrayLength: null, maxStringLength: null, depth: null}))

    if (objToAnalyze === null || objToAnalyze === undefined) {
        try {
            throw new Error('null object being analyzed')
        } catch (err) {
            console.log(err)
        }
        return 'Nil';  // Or handle this case as you see fit
    }


    // For every key value pair in an object
    for (const [key, val] of Object.entries(objToAnalyze)) {
        console.log('key: ', key, 'val:', val)

        // If the value is an array or an object
        if (typeof val === 'object') {

            // If the value is an array
            // (We assume that all arrays will hold values of the same type)
            if (Array.isArray(val)) {

                console.log('Val is an array')

                // If the array is an array of objects
                if (val.length && typeof val[0] === 'object' && !Array.isArray(val[0])) {

                    console.log('val[0]', val[0])

                    // First, we create a new array to store type-converted objects
                    let arrayOfObjects = []

                    // Next, we recursively convert each object within the array
                    for (let i = 0; i < val.length; i++) {
                        arrayOfObjects.push(recursiveTypeConverter(val[i]))
                    }

                    console.log('Array of objects:', util.inspect(arrayOfObjects, {maxArrayLength: null, maxStringLength: null, depth: null}))

                    // Last, we perform an operation on this array of objects,
                    // Reducing all objects to one single object containing all possible keys,
                    // Including nested keys, from each of the objects in the array

                    currentObj[key] = [mergeObjectsOnType(arrayOfObjects)]
                    
                    
                // Else if the array is an array of primitive types
                } else if (val.length) {

                    // Set the value of key to an array containing the type of data stored in the array
                    currentObj[key] = [typeCheck(val[0])]

                // Else if the array is empty
                } else {

                    // Return an array containing Nil, as the type is unknown
                    currentObj[key] = ['Nil']
                }

            // Else the value is an object
            } else {

                if (val === null || val === undefined) {
                    try {
                        throw new error('Null or undefined object')
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    console.log('About to recurse on an object,  key:', key, 'val:', val)
                    // Begin recursion on the nested object
                    currentObj[key] = recursiveTypeConverter(val)
                }

                
            }

        // Else the value is a primitive type  
        } else {

            // Change the value of the key to the type of its value
            currentObj[key] = typeCheck(val)
        }
    }

    console.log('Done')
    console.log('Inspected obj: \n', util.inspect(currentObj, {maxArrayLength: null, maxStringLength: null, depth: null}))
    return currentObj
}

function recursiveTypeConverterWithName(name, objToAnalyze) {

    console.log()

    // This is the object that will be returned
    let currentObj = {}

    console.log('Begin new recursion on object:', name)
    console.log(util.inspect(objToAnalyze, {maxArrayLength: null, maxStringLength: null, depth: null}))


    // For every key value pair in an object
    for (const [key, val] of Object.entries(objToAnalyze)) {
        console.log('key: ', key, 'val:', val)

        // If the value is an array or an object
        if (typeof val === 'object') {

            // If the value is an array
            // (We assume that all arrays will hold values of the same type)
            if (Array.isArray(val)) {

                console.log('Val is an array')

                // If the array is an array of objects
                if (val.length && typeof val[0] === 'object' && !Array.isArray(val[0])) {

                    console.log('val[0]', val[0])

                    // First, we create a new array to store type-converted objects
                    let arrayOfObjects = []

                    // Next, we recursively convert each object within the array
                    for (let i = 0; i < val.length; i++) {
                        arrayOfObjects.push(recursiveTypeConverter(key, val[i]))
                    }

                    console.log('Array of objects:', util.inspect(arrayOfObjects, {maxArrayLength: null, maxStringLength: null, depth: null}))

                    // Last, we perform an operation on this array of objects,
                    // Reducing all objects to one single object containing all possible keys,
                    // Including nested keys, from each of the objects in the array

                    currentObj[key] = [mergeObjectsOnType(arrayOfObjects)]
                    
                    
                // Else if the array is an array of primitive types
                } else if (val.length) {

                    // Set the value of key to an array containing the type of data stored in the array
                    currentObj[key] = [typeCheck(val)]

                // Else if the array is empty
                } else {

                    // Return an array containing Nil, as the type is unknown
                    currentObj[key] = ['Nil']
                }

            // Else the value is an object
            } else {

                console.log('About to recurse on an object,  key:', key, 'val:', val)

                // Begin recursion on the nested object
                currentObj[key] = recursiveTypeConverter(key, val)
            }

        // Else the value is a primitive type  
        } else {

            // Change the value of the key to the type of its value
            currentObj[key] = typeCheck(val)
        }
    }

    console.log('Done')
    console.log('Inspected obj: \n', util.inspect(currentObj, {maxArrayLength: null, maxStringLength: null, depth: null}))
    return currentObj
}

// Takes an array of objects, returns a single object
// Basically combines all objects in the array
// Returns an object containing all keys and TYPES of values
// Whether a key is in one object or every object, it will be in the final result
// Even nested arrays of objects should be converted to an array containing a single object,
// However considering this is a step in another depth-first recursive function
// this should already be taken care of

function mergeObjectsOnType(objects) {
    let result = {}

    console.log('Entered merge objects on type')
    // Iterates over each object
    for (const object of objects) {

        console.log('Entered object iteration')

        // Iterates over each key, value pair in an object
        // Value should already be a type
        for (let [key, val] of Object.entries(object)) {

            console.log('Entered key, val iteration for key:', key, 'val: ', val)

            console.log(key)
            
            // If value at key is an object or array
            if (typeof val === 'object') {
                
                // If the value at key is an array
                if (Array.isArray(val)) {

                    // if the array is not empty
                    if (val.length) {

                        // if the array is an array of objects
                        if (typeof val[0] === 'object' && !Array.isArray(val[0])) {

                            // There should only be one object stored in the array by this point,
                            // As parent objects will be merged after nested objects
                            if (val.length === 1) {
                                
                                if (key in result) {
                                    result[key] = [mergeObjectsOnType([{...result[key][0]}, {...val[0]}])]
                                } else {
                                    result[key] = [val[0]]
                                }
                            } else {
                                throw new Error('Nested array with more than 1 object:', key, val)
                            }

                        // If the array is an array of primitive types
                        } else {
                            if (key in result) {
                                result[key] = [mergeIfOptional(result[key], val)]
                            }
                        }

                    // else if the array is empty
                    } else {
                        if (key in result) {
                            continue
                        } else {
                            result[key] = []
                        }
                    }

                // Else if the value at key is an object
                } else {

                    // If there is already an object in the array at key
                    if (key in result) {
                        result[key] = mergeObjectsOnType([{...result[key]}, {...val}])

                    } else {
                        result[key] = {...val}
                    }
                }

            // Else if the value at key is a primitive type
            } else {

                // If the key already exists in the result from a previous object
                if (key in result) {

                    console.log(`Merging at key ${key} on val: ${val} and result[key]: ${result[key]}`)
                    // Check to see if the two types are the same, or if they should be combined into an optional
                    let currentValAtKey = result[key]
                    let newVal = mergeIfOptional(val, currentValAtKey)

                    console.log('New Val after merge: ', newVal)

                    result[key] = newVal


                } else {

                    // Add the type of this val 'val' to the result under key 'key'
                    result[key] = val
                }
            }

        }
    }

    return result
}

exports.breakdownResponse = breakdownResponse
exports.parseJSON = parseJSON
exports.typeConverter = recursiveTypeConverter
exports.typeConverterWName = recursiveTypeConverterWithName