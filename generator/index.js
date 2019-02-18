const generator = require("./scripts/generator");

function isInArgs(arg){
    let args = process.argv.filter((element, i)=> {return i>2})
    return args.includes(arg)
}

console.log("######GENERATOR######")
if (process.argv.length < 3 ){
    return console.warn("need argument 'component name'")
}

let modelName = process.argv[2];
if(!isInArgs("--noController")){
    generator.controller(modelName)
}
if(!isInArgs("--noModel")){
    generator.model(modelName)
}
if(!isInArgs("--noRoutes")){
    generator.routes(modelName)
}
console.log("#####################")




