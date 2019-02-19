//instantiate api routes
let {isAuthenticate} = require("../utils/middlewares");

/**WARNING: Please note ...GENERATOR... should not be modified or deleted */

module.exports = (router) => {
    router.use('/auth', require('./auth-routes'));
    router.use('api/users',isAuthenticate, require('./users-routes'));
    router.use('/api/posts', require('./posts-routes'));
	//...GENERATOR...
}