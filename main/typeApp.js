// const {analyzeStruct, breakdownStruct, organizeStruct} = require('../functions/struct')
// const {breakdownResponse, parseJSON} = require('../functions/response')
// const {structInput, responseInput} = require('../data')
const {typeConverter, typeConverterWName} = require('../functions/response')
const util = require('util');
const os = require('os');
const fs = require('fs')
// const {typeCheck, typeCompare, mergeIfOptional} = require('../functions/type')
const {translatedResponse} = require('../output/letsTry/letsTry52')

function start(i) {

    let inspectedResult = util.inspect(typeConverter(translatedResponse), {maxArrayLength: null, maxStringLength: null, depth: null})
    // let inspectedResult = util.inspect(typeConverterWName('start', translatedResponse), {maxArrayLength: null, maxStringLength: null, depth: null})

    fs.writeFile(`typedResponse${i}.js`, 'const typedResponse = ' + inspectedResult, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log('Successfully wrote to file')
        }
    })

    console.log(inspectedResult)

}

start(8)