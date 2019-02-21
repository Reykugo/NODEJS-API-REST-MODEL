const fs = require('fs')
const replace = require('replace')
const yaml = require('js-yaml');
const docBuilder = require('./doc-builder');

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const launchReplace = (component, filePath) =>{
    replace({
        regex: "NAME",
        replacement: component,
        paths: [filePath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "Name",
        replacement: capitalize(component.toLowerCase()),
        paths: [filePath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "name",
        replacement: component.toLowerCase(),
        paths: [filePath],
        recursive: true,
        silent: true,
    });
}


const copyTemplate = (templateName, destPath, component) =>{
    try{
        fs.copyFileSync(`./generator/template/${templateName}`, destPath);
        launchReplace(component, destPath)
        console.log(`${destPath} has been created`)
    }catch(err){
        console.error(err)
    }
}

exports.controller = (component) =>{
    let filePath = `./src/controllers/${component}-controller.js`;
    copyTemplate('controller.js', filePath, component)
}

exports.model = (component) =>{
    let filePath = `./src/models/${component}-model.js`;
    copyTemplate('model.js', filePath, component);
}

exports.routes = (component) =>{
    let filePath = `./src/api/${component}-routes.js`;
    copyTemplate('routes.js', filePath, component);
    replace({
        regex: "//...GENERATOR...",
        replacement: `router.use('/api/${component.toLowerCase()}', require('./${component}-routes'));\n\t//...GENERATOR...`,
        paths: ['./src/api/index.js'],
        recursive: false,
        silent: true,
    });
}

exports.doc = (component) => {
    docBuilder.generateComponentDoc(component);
}

