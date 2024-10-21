const {analyzeStruct, breakdownStruct, organizeStruct, recursiveStructPopulator} = require('../functions/struct')
const {breakdownResponse, parseJSON} = require('../functions/response')
const {structInput, responseInput} = require('../data')
const util = require('util');
const os = require('os');
const fs = require('fs')





// ---- START STRUCT INTERPRETER -----

function start(i) {
    const brokenStruct = breakdownStruct(structInput)

    const inspectedBrokenStruct = util.inspect(brokenStruct, {maxArrayLength: null, maxStringLength: null, depth: null})

    fs.writeFile(`brokenStruct${i}.txt`, inspectedBrokenStruct, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    const [structMapCopy, stringified] = organizeStruct(brokenStruct)

    let inspectedMap = util.inspect(structMapCopy, {maxArrayLength: null, maxStringLength: null, depth: null})
    let inspectedStringified = util.inspect(stringified, {maxArrayLength: null, maxStringLength: null, depth: null})

    fs.writeFile(`structMap${i}.txt`, inspectedMap, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    fs.writeFile(`structMap${i}.js`, `const structMap${i} = ` + inspectedMap, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    fs.writeFile(`structStringified${i}.txt`, inspectedStringified, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    const populated = recursiveStructPopulator(structMapCopy, 'DetailedShowResponse')

    const inspectedPopulated = util.inspect(populated, {maxArrayLength: null, maxStringLength: null, depth: null})

    fs.writeFile(`populatedStructMap${i}.js`, `const populatedMap${i} = ` + inspectedPopulated, 'utf8', (err) => {
        if (err) {
            console.log("An error occurred: ", (err))
        } else {
            console.log("Successfully wrote to file")
        }
    })
}

start(17)


// ------ END STRUCT INTERPRETER ------

// console.log(util.inspect(JSON.parse(responseInput), {maxArrayLength: null, maxStringLength: null, depth: null}))