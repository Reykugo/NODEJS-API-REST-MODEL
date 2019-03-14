require("dotenv").config();
const Koa = require('koa');
const Router = require("koa-router");
const config = require('./config');
const app = new Koa();
const router = new Router()
require('./services/koa-service').start(app, router, config.PORT);