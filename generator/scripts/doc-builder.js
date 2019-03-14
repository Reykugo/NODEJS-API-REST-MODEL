require("dotenv").config();
const fs = require('fs');
const yaml = require('js-yaml');
const replace = require("replace");
const pluralize = require('pluralize');
const {capitalize, removeFromArray} = require('../_common');

const launchReplace = (component, destPath) => {
    replace({
        regex: "..Generators..",
        replacement: pluralize.plural(capitalize(component.toLowerCase())),
        paths: [destPath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "..generators..",
        replacement: pluralize.plural(component.toLowerCase()),
        paths: [destPath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "..Generator..",
        replacement: pluralize.singular(capitalize(component.toLowerCase())),
        paths: [destPath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "..generator..",
        replacement: pluralize.singular(component.toLowerCase()),
        paths: [destPath],
        recursive: true,
        silent: true,
    });
}

exports.generateComponentDoc = (component) => {
    try {
        let destPath = `./src/api/doc/components/_${pluralize.plural(component.toLowerCase())}.yml`
        if(!fs.existsSync(destPath)){
            fs.copyFileSync(`./generator/template/component-doc.yml`, destPath);
            launchReplace(component, destPath)
            console.log(`${destPath} has been created`)
        }else{
            console.log(`${destPath} already exists`)
        }
    } catch (err) {
        console.error(err)
    }
   
}

exports.build = (order, exlude) =>{
    let componentsDoc = fs.readdirSync("./src/api/doc/components");
    if(order && Array.isArray(order)){
        componentsDoc.sort(function(a, b){
            return order.indexOf(a) - order.indexOf(b)
        })
    }
    removeFromArray(componentsDoc, "_header.yml");
    if (exlude && Array.isArray(exlude)){
        for(let item of exlude){
            removeFromArray(componentsDoc, item)
        }
    }

    let headerComponent = yaml.safeLoad(fs.readFileSync('./src/api/doc/components/_header.yml', 'utf8'));
    headerComponent.servers[0].url = `http://localhost:${process.env.PORT_DEV}/api`
    //init keys if null
    if (!headerComponent.tags) {
        headerComponent.tags = []
    }
    if (!headerComponent.paths) {
        headerComponent.paths = {}
    }

    if(!headerComponent.components.responses){
        headerComponent.components.responses = {}
    }

    if (!headerComponent.components.schemas) {
        headerComponent.components.schemas = {}
    }

    for(let component of componentsDoc){
        try {
            let componentDoc = yaml.safeLoad(fs.readFileSync(`./src/api/doc/components/${component}`, 'utf8'));

            if(componentDoc.tags){
                headerComponent.tags = headerComponent.tags.concat(componentDoc.tags);
            }
            if(componentDoc.paths){
                headerComponent.paths = Object.assign(headerComponent.paths, componentDoc.paths);
            }
            if(componentDoc.components.schemas){
                headerComponent.components.schemas = Object.assign(headerComponent.components.schemas, componentDoc.components.schemas);
            }
            if(componentDoc.components.responses){
                headerComponent.components.schemas = Object.assign(headerComponent.components.responses, componentDoc.components.responses);
            }
        } catch (e) {
            console.log(e);
        }
    }
    fs.writeFileSync("./src/api/doc/api-doc.yml", yaml.safeDump(headerComponent), "utf8");
    console.log("#### Doc has been build ####")
}