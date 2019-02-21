exports.capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

exports.removeFromArray = (array, item) => {
    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}