const generator = require("./scripts/generator");

function isInArgs(arg){
    let args = process.argv.filter((element, i)=> {return i>2})
    return args.includes(arg)
}

console.log("######GENERATOR######")
if (process.argv.length < 3 ){
    return console.warn("need argument 'component name'")
}

let component = process.argv[2].trim();
if(!isInArgs("--noController")){
    generator.controller(component)
}
if(!isInArgs("--noModel")){
    generator.model(component)
}
if(!isInArgs("--noRoutes")){
    generator.routes(component)
}

if(!isInArgs("--noDoc")){
    generator.doc(component)
}

console.log("#####################")




