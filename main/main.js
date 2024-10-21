const {breakdownStruct, organizeStruct, recursiveStructPopulator} = require('../functions/struct')
const {breakdownResponse, parseJSON} = require('../functions/response')
const {structInput, responseInput} = require('../data')
const util = require('util');
const os = require('os');
const fs = require('fs')

// ---- START JSON INTERPRETER -----

function convertJSONtoJSObject(i) {

    let brokenResponse = breakdownResponse(responseInput)
    let responseOutput = parseJSON(brokenResponse)

    const objectData = util.inspect(responseOutput, {depth: null, maxArrayLength: null, maxStringLength: null})

    let stringCorrected = objectData.replace(/' \+|" \+/g, ' ').replace(/(?<!')"(?!')/g, '\\"').replace(/(?<='")(.*?)'(.*?)(?="',)/g, (match, p1, p2) => `${p1}\\'${p2}`).replace(/(?!<\\)(?!<`)"(?!=`)/g, '`').replace(/(?!<\\)'/g, '')

    fs.writeFile(`letsTry${i}.js`, `export const result${i} = ` + stringCorrected , 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    return eval(stringCorrected)

    // + '\nexports.result = result'
}

function convertStructsToJSObject(i) {
    const brokenStruct = breakdownStruct(structInput)

    const [structMapCopy, stringified] = organizeStruct(brokenStruct)

    const populated = recursiveStructPopulator(structMapCopy, 'DetailedShowResponse')

    const inspectedPopulated = util.inspect(populated, {maxArrayLength: null, maxStringLength: null, depth: null})

    fs.writeFile(`populatedStructMap${i}.js`, `const populatedMap${i} = ` + inspectedPopulated, 'utf8', (err) => {
        if (err) {
            console.log("An error occurred: ", (err))
        } else {
            console.log("Successfully wrote to file")
        }
    })

    return populated
}

function convert


// ------ END STRUCT INTERPRETER ------

// console.log(util.inspect(JSON.parse(responseInput), {maxArrayLength: null, maxStringLength: null, depth: null}))