const Joi = require('Joi');

module.exports = {
    create:{
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}/).required()
    },
    update:{
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}/)
    }
}