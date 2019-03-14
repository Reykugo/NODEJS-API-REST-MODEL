//instantiate api routes

/**WARNING: Please note ...GENERATOR... should not be modified or deleted */

module.exports = (router) => {
    router.use('/api/auth', require('./auth-routes'));
    router.use('/api/users', require('./users-routes'));
	//...GENERATOR...
}