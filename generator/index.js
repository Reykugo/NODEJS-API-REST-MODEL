const generator = require("./scripts/generator");
const args = require('minimist')(process.argv.slice(2));

if (args.component || args.c) {
    console.log("######GENERATOR######")
    let component = args.component || args.c
    if (args.noController) {
        generator.controller(component)
    }
    if (!args.noModel) {
        generator.model(component)
    }
    if (!args.noRoutes) {
        generator.routes(component)
    }

    if (args.noDoc) {
        generator.doc(component)
    }
    console.log("#####################")
}else{
    return console.warn("need argument '-c or --component'")
}






