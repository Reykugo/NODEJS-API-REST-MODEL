//instantiate api routes
let {isAuthenticate} = require("../utils/middlewares");

module.exports = (router) => {
    router.prefix('/api')
    router.use('/auth', require('./auth'))
    router.use('/users',isAuthenticate, require('./user'));
}