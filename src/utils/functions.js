
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
    return typeof param == "array" || param instanceof Array
}

exports.isObject = (param) =>{
    return typeof param === 'object' || param instanceof Object
}
