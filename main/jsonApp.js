const {analyzeStruct, breakdownStruct, organizeStruct} = require('../functions/struct')
const {breakdownResponse, parseJSON} = require('../functions/response')
const {structInput, responseInput} = require('../data')
const util = require('util');
const os = require('os');
const fs = require('fs');

// ---- START JSON INTERPRETER -----

function start(i) {

    let brokenResponse = breakdownResponse(responseInput)

    // let brokenResponse2 = util.inspect(breakdownResponse(responseInput), {depth: null, maxArrayLength: null})

    // fs.writeFile('broken13.txt', brokenResponse2, 'utf8', (err) => {
    //     if (err) {
    //         console.error('Error writing to file', err)
    //     } else {
    //         console.log('Successfully wrote to file')
    //     }
    // })

    let responseOutput = parseJSON(brokenResponse)

    const objectData = util.inspect(responseOutput, {depth: null, maxArrayLength: null, maxStringLength: null})
    console.log(util.inspect(responseOutput, {depth: null, maxArrayLength: null, colors: true}))

    fs.writeFile(`result${i}.js`, `const result${i} = ` + objectData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    let letsTryIt = objectData.replace(/' \+|" \+/g, ' ').replace(/(?<!')"(?!')/g, '\\"').replace(/(?<='")(.*?)'(.*?)(?="',)/g, (match, p1, p2) => `${p1}\\'${p2}`).replace(/(?!<\\)(?!<`)"(?!=`)/g, '`').replace(/(?!<\\)'/g, '')
    /////////// .replace(/(?<=")'|'(?=")/g, "")


    fs.writeFile(`letsTry${i}.js`, `const result${i} = ` + letsTryIt, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })
}

start(52)


// ------ END JSON INTERPRETER ------

// EXTRAS


// let responsePreSplit = util.inspect(responseInput, {depth: null, maxArrayLength: null, maxStringLength: null})

// fs.writeFile('printed.txt', responsePreSplit, 'utf8', (err) => {
//     if (err) {
//         console.error('Error writing to file', err)
//     } else {
//         console.log('Successfully wrote to file')
//     }
// })

// let stringified = util.inspect(JSON.stringify(responseInput), {depth: null, maxArrayLength: null, maxStringLength: null})

// fs.writeFile('stringified.txt', stringified, 'utf8', (err) => {
//     if (err) {
//         console.error('Error writing to file', err)
//     } else {
//         console.log('Successfully wrote to file')
//     }
// })

// fs.writeFile('result39.txt', objectData, 'utf8', (err) => {
//     if (err) {
//         console.error('Error writing to file', err)
//     } else {
//         console.log('Successfully wrote to file')
//     }
// })

// console.log(util.inspect(JSON.parse(responseInput), {maxArrayLength: null, maxStringLength: null, depth: null}))