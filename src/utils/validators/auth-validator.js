const Joi = require('Joi');

module.exports = {
    auth: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}/).required()
    },
}