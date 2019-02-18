const fs = require('fs')
const replace = require('replace')


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const launchReplace = (modelName, filePath) =>{
    replace({
        regex: "NAME",
        replacement: modelName,
        paths: [filePath],
        recursive: true,
        silent: true,
    });

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
}


const copyTemplate = (templateName, destPath, modelName) =>{
    try{
        fs.copyFileSync(`./generator/template/${templateName}`, destPath);
        launchReplace(modelName, destPath)
        console.log(`${destPath} has been created`)
    }catch(err){
        console.error(err)
    }
}

exports.controller = (modelName) =>{
    let filePath = `./src/controllers/${modelName}-controller.js`;
    copyTemplate('controller.js', filePath, modelName)
}

exports.model = (modelName) =>{
    let filePath = `./src/models/${modelName}-model.js`;
    copyTemplate('model.js', filePath, modelName);
   
}

exports.routes = (modelName) =>{
    let filePath = `./src/api/${modelName}.js`;
    copyTemplate('routes.js', filePath, modelName);
    
}

