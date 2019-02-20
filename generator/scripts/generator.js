const fs = require('fs')
const replace = require('replace')
const yaml = require('js-yaml');

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

const replaceInDoc = (modelName) =>{
    replace({
        regex: "..Generator..",
        replacement: capitalize(modelName.toLowerCase()),
        paths: ["./src/api/doc/api.yml"],
        recursive: true,
        silent: true,
    });

    replace({
        regex: "..generator..",
        replacement: modelName.toLowerCase(),
        paths: ["./src/api/doc/api.yml"],
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
    try {
        let doc = yaml.safeLoad(fs.readFileSync("./src/api/doc/api.yml", 'utf8'));
        let model = yaml.safeLoad(fs.readFileSync('./generator/template/model-doc.yml', 'utf8'));
        if(!(capitalize(modelName.toLowerCase()) in doc.components.schemas)){
            doc.components.schemas = Object.assign(doc.components.schemas, model)
        }
        fs.writeFileSync("./src/api/doc/api.yml", yaml.safeDump(doc), "utf8")
        replaceInDoc(modelName)
    } catch (e) {
        console.log(e);
    }
   
}

exports.routes = (modelName) =>{
    let filePath = `./src/api/${modelName}-routes.js`;
    copyTemplate('routes.js', filePath, modelName);
    replace({
        regex: "//...GENERATOR...",
        replacement: `router.use('/api/${modelName}', require('./${modelName}-routes'));\n\t//...GENERATOR...`,
        paths: ['./src/api/index.js'],
        recursive: false,
        silent: true,
    });
    try {
        let doc = yaml.safeLoad(fs.readFileSync("./src/api/doc/api.yml", 'utf8'));
        let model = yaml.safeLoad(fs.readFileSync('./generator/template/crud-doc.yml', 'utf8'));
        doc.paths = Object.assign(doc.paths, model)
        fs.writeFileSync("./src/api/doc/api.yml", yaml.safeDump(doc), "utf8")
        replaceInDoc(modelName)
    } catch (e) {
        console.log(e);
    }
  
}

