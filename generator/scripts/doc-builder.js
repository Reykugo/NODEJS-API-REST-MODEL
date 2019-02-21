const fs = require('fs');
const yaml = require('js-yaml');
const replace = require("replace");

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const removeFromArray = (array, item) => {
    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

const launchReplace = (component, destPath) => {
    replace({
        regex: "..Generator..",
        replacement: capitalize(component.toLowerCase()),
        paths: [destPath],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "..generator..",
        replacement: component.toLowerCase(),
        paths: [destPath],
        recursive: true,
        silent: true,
    });
}

exports.generateComponentDoc = (component) => {
    try {
        let destPath = `./src/api/doc/components/_${component.toLowerCase()}.yml`
        fs.copyFileSync(`./generator/template/component-doc.yml`, destPath);
        launchReplace(component, destPath)
        console.log(`${destPath} has been created`)
    } catch (err) {
        console.error(err)
    }
   
}

exports.build = (exlude) =>{
    console.log("##########DOC BUILDER##########")
    let componentsDoc = fs.readdirSync("./src/api/doc/components");
    removeFromArray(componentsDoc, "_header.yml");
    if (exlude && Array.isArray(exlude)){
        for(let item of exlude){
            removeFromArray(componentsDoc, item)
        }
    }

    let headerComponent = yaml.safeLoad(fs.readFileSync('./src/api/doc/components/_header.yml', 'utf8'));
    /*console.log(headerComponent.tags)
    console.log(headerComponent.paths)
    console.log(headerComponent.components.schemas)*/
    if (!headerComponent.tags) {
        headerComponent.tags = []
    }
    if (!headerComponent.paths) {
        headerComponent.paths = {}
    }

    if (!headerComponent.components.schemas) {
        headerComponent.components.schemas = {}
    }

    for(let component of componentsDoc){
        try {
            let componentDoc = yaml.safeLoad(fs.readFileSync(`./src/api/doc/components/${component.toLowerCase()}`, 'utf8'));

            if(componentDoc.tags){
                headerComponent.tags = headerComponent.tags.concat(componentDoc.tags);
            }
            if(componentDoc.paths){
                headerComponent.paths = Object.assign(headerComponent.paths, componentDoc.paths);
            }
            if(componentDoc.components.schemas){
                headerComponent.components.schemas = Object.assign(headerComponent.components.schemas, componentDoc.components.schemas);
            }
        } catch (e) {
            console.log(e);
        }
    }
    fs.writeFileSync("./src/api/doc/api-doc.yml", yaml.safeDump(headerComponent), "utf8");
    console.log("############################")
}