const config = require('../config');
const mongoose = require("./mongoose-service");
const cors = require("@koa/cors")
const swagger = require('swagger2');
const { ui } = require('swagger2-koa');
const docBuilder = require('../../generator/scripts/doc-builder');

exports.start = (app, router, port) => {
    docBuilder.build();
    const document = swagger.loadDocumentSync(require('path').join(__dirname, '../api/doc/api-doc.yml'));

    require('../api')(router)

    app.use(cors());
    app.use(require("koa-body")());
    app.use(require('koa-respond')())

    app.use(ui(document, "/", ['/api']));

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // will only respond with JSON
            console.log("error during request: ", err)
            ctx.internalServerError();
        }
    })

    app.use(router.allowedMethods())
    app.use(router.routes())


    //Connect to database
    if (config.DBURI) {
        mongoose.connect(config.DBURI);
    }

    if (!port) port = 8080;
    app.listen(port, () => console.log("Server running on:" + port));
    return app;
}