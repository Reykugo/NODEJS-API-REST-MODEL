//instantiate api routes
let {isAuthenticate} = require("../utils/middlewares");

module.exports = (router) => {
    router.use('/auth', require('./auth'))
    router.use('api/users',isAuthenticate, require('./user'));
}