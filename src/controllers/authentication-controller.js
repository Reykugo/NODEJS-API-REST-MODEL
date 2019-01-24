const jwt = require('jsonwebtoken')
const config = require('../config'); 
const User = require('../models/user-model');
const {isString} = require('../utils/functions')


exports.login = async (ctx) => {
    const reqData = ctx.request.body
    if (!isString(reqData.username) || !isString(reqData.password)) {
        return ctx.badRequest({success:false, error:"FieldsIncorrectOrMissing"})
    } else {
        const user = await User.findOne({ username: reqData.username })
        if (!user) {
            return ctx.badRequest({success:false, error:"BadUsername"});
        } else if (user.status !== "activated") {
            return ctx.send(403, { success: false, error: "UserNotActive" })
        } else {
            const isSamePasswords = user.comparePasswords(reqData.password)
            if (isSamePasswords) {
                const payload = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    admin: user.admin,
                    status:user.status
                };

                // create a token string
                const token = await jwt.sign(payload, config.JWTSECRET);
                ctx.ok({ success: true, token: token });
            } else {
                return ctx.badRequest({success:false, error:"BadPassword"});
            }
        }

    }
};