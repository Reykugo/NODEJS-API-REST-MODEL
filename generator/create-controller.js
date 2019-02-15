const fs = require('fs')
const replace = require('replace')
let modelName = process.argv[2]

let filePath = `../src/controllers/${modelName}-controller.js`;

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

fs.copyFile('./template/controller.js', filePath, (err) => {
    if (err) throw err;
    replace({
        regex: "Name",
        replacement: capitalize(modelName.toLowerCase()),
        paths: [filePath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "name",
        replacement: modelName.toLowerCase(),
        paths: [filePath],
        recursive: true,
        silent: true,
    });

    console.log(`${modelName}-controller.js has been created`)
});

