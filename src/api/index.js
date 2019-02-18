//instantiate api routes
let {isAuthenticate} = require("../utils/middlewares");

module.exports = (router) => {
    router.use('/auth', require('./auth-routes'))
    router.use('api/users',isAuthenticate, require('./users-routes'));
}