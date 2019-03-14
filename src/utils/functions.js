const mongoose = require('mongoose')

/**
 * check if parameter is null or undefined
 * @param {any} param parameter to check
 */

exports.isEmpty = (param) => {
    return param === undefined || param === null
}


exports.isString = (param) =>{
    return typeof param === 'string' || param instanceof String
}

exports.isArray = (param) =>{
    return Array.isArray(param) || param instanceof Array
}

exports.isObject = (param) =>{
    return typeof param === 'object' || param instanceof Object
}

exports.isObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

//remove keys from object: (Object, Array)
exports.exludeFromObject = (object, exludes) => {
    for(let value of exludes){
        if(value in object)
            delete object[value]
    }
    return object  
}

