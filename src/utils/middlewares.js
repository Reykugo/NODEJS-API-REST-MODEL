const jwt = require('jsonwebtoken');
const config = require("../config")

exports.isAuthenticate = async (ctx, next) => {
    let req = ctx.request;
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(" ")[1] || req.cookies.token;
    if (token) {
        let decoded = null;
        try{
            decoded = await jwt.verify(token, config.JWTSECRET)
        }catch(err){
            console.log(err)
            return ctx.badRequest({ success: false, error: "BadToken" });
        }
        if (decoded.status === "activated") {
            ctx.auth = decoded
            await next();
        } else {
            return ctx.send(403, { success: false, error: "UserNotActive" })
        }
    } else {
        return ctx.send(403, {success: false, error: "NotTokenProvided"})
    }
}

exports.isAdmin = async (ctx, next) =>{
    let auth = ctx.auth;
    if(auth.admin){
        await next();
    }else{
        return ctx.send(401, {success:false, message:"PermissionDenied"})
    }

}