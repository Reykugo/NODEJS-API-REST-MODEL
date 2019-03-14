const jwt = require('jsonwebtoken')
const config = require('../config'); 
const User = require('../models/user-model');
const joi = require('joi');
const authValidator = require('../utils/validators/auth-validator');


exports.login = async (ctx) => {
    const reqData = ctx.request.body
    let validation = joi.validate(reqData, authValidator.auth);
    if (validation.error) {
        return ctx.badRequest({error:"FieldsIncorrectOrMissing"})
    } else {
        const user = await User.findOne({ email: reqData.email }).select("+password")
        if (!user) {
            return ctx.badRequest({error:"BadEmail"});
        }  else {
            const isSamePasswords = user.comparePasswords(reqData.password)
            if (isSamePasswords) {
                const payload = {
                    id: user._id,
                    email: user.email,
                    admin: user.admin,
                };

                // create a token string
                const token = await jwt.sign(payload, config.JWTSECRET);
                ctx.ok({token});
            } else {
                return ctx.badRequest({error:"BadPassword"});
            }
        }

    }
};