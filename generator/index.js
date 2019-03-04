const generator = require("./scripts/generator");
const args = require('minimist')(process.argv.slice(2),{
    string: ["component"],
    alias: {c:"component"},
    boolean: ["noDoc", "noModel", "noRoutes", "noController"],
    stopEarly: true,
});
if ( typeof args.component === 'string' || args.component instanceof String) {
    console.log("######GENERATOR######")
    let component = args.component 
    if (!args.noController) {
        generator.controller(component)
    }
    if (!args.noModel) {
        generator.model(component)
    }
    if (!args.noRoutes) {
        generator.routes(component)
    }

    if (!args.noDoc) {
        generator.doc(component)
    }
    console.log("#####################")
}else if(args.component === ""){
    return console.warn ("argeument component need value")
}else{
    return console.warn("need argument '-c or --component'")
}






