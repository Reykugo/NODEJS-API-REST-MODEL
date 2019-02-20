const jwt = require('jsonwebtoken');
const config = require("../config");
const { isObjectId } = require('../utils/functions');

exports.isAuthenticate = async (ctx, next) => {
    let req = ctx.request;
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    if (token) {
        let decoded = null;
        try{
            decoded = await jwt.verify(token, config.JWTSECRET)
        }catch(err){
            console.log(err)
            return ctx.badRequest({error: "BadToken" });
        }
        ctx.auth = decoded
        await next();
       
    } else {
        return ctx.send(401, { error: "NotTokenProvided"})
    }
}

exports.isAdmin = async (ctx, next) =>{
    let auth = ctx.auth;
    if(auth.admin){
        await next();
    }else{
        return ctx.send(401, {error:"PermissionDenied"})
    }

}

exports.idIsValid = async (ctx, next) => {
    let id = ctx.params.id
    if (!isObjectId(id)) {
        return ctx.badRequest({error: "BadId" })
    }
    else {
        await next()
    }
}