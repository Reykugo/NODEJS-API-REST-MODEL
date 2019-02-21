require("dotenv").config();
const config = require('./config');
const Koa = require('koa');
const mongoose = require("mongoose");
const Router = require("koa-router");
const cors = require("@koa/cors")
const swagger = require( 'swagger2');
const {ui} = require( 'swagger2-koa');
const docBuilder = require('../generator/scripts/doc-builder');

const app = new Koa();
const router = new Router()


docBuilder.build();
const document = swagger.loadDocumentSync(__dirname + '/api/doc/api-doc.yml');


require('./api')(router)

app.use(cors());
app.use(require("koa-body")());
app.use(require('koa-respond')())

app.use(ui(document,"/",['/api']));

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
if (config.DBURI){
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose.connect(config.DBURI, { useNewUrlParser: true}).then(() =>{
        console.log("connected to db")
    }).catch(err =>{
        throw(err)
    })
}

let port = config.PORT || '8080';
app.listen(port, () => console.log("Server running on:" + port));

module.exports = app;
