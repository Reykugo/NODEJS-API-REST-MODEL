const fs = require('fs')
const replace = require('replace')
const docBuilder = require('./doc-builder');
const {capitalize} = require('../_common');
const pluralize = require("pluralize");

const launchReplace = (component, filePath) =>{
    replace({
        regex: "Names",
        replacement: pluralize.plural(capitalize(component.toLowerCase())),
        paths: [filePath],
        recursive: true,
        silent: true,
    });
    
    replace({
        regex: "names",
        replacement: pluralize.plural(component.toLowerCase()),
        paths: [filePath],
        recursive: true,
        silent: true,
    });
    replace({
        regex: "Name",
        replacement: pluralize.singular(capitalize(component.toLowerCase())),
        paths: [filePath],
        recursive: true,
        silent: true,
    });
    replace({
        regex: "name",
        replacement: pluralize.singular(component.toLowerCase()),
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
    let filePath = `./src/controllers/${pluralize.plural(component.toLowerCase())}-controller.js`;
    copyTemplate('controller.js', filePath, component)
}

exports.model = (component) =>{
    let filePath = `./src/models/${pluralize.singular(component.toLowerCase())}-model.js`;
    copyTemplate('model.js', filePath, component);
}

exports.routes = (component) =>{
    let filePath = `./src/api/${pluralize.plural(component.toLowerCase())}-routes.js`;
    copyTemplate('routes.js', filePath, component);
    replace({
        regex: "//...GENERATOR...",
        replacement: `router.use('/api/${pluralize.plural(component.toLowerCase())}', require('./${pluralize.plural(component.toLowerCase())}-routes'));\n\t//...GENERATOR...`,
        paths: ['./src/api/index.js'],
        recursive: false,
        silent: true,
    });
}

exports.doc = (component) => {
    docBuilder.generateComponentDoc(component);
}

