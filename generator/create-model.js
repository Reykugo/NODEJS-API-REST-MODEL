const fs = require('fs')
const replace = require('replace')
let modelName = process.argv[2]

let filePath = `../src/models/${modelName}-model.js`

fs.copyFile('./template/model.js', filePath, (err) => {
    if (err) throw err;
    replace({
        regex: "NAME",
        replacement: modelName,
        paths: [filePath],
        recursive: true,
        silent: true,
    });
    console.log(`${modelName}-model.js has been created`)
});

