const validator = require('validator');
const User = require('../models/user-model');
const {isEmpty, isString} = require('../utils/functions');

exports.get = async(ctx) =>{
    let users = await User.find({})
    return ctx.ok({success:true, users:users});
}

exports.getUser = async(ctx) =>{
    let id = ctx.params.id
    let user = await User.findById(id);
    return ctx.ok({success:true, user:user})
}

exports.create = async(ctx) => {
    const reqData = ctx.request.body;
    if(!isString(reqData.username) || !isString(reqData.password) || !isString(reqData.email)|| !validator.isEmail(reqData.email)){
        return ctx.badRequest({success:false, error: 'FieldIncorrectOrMissing'})
    }else{
        const userData = {
            name: reqData.name,
            username: reqData.username,
            password: reqData.password,
            email: reqData.email.trim(),
            status: reqData.status
        }
        const userExist = await User.findOne({$or: [
            { email: userData.email },
            { username: userData.username }
        ]})
        if(userExist){
            ctx.badRequest('UserAlreadyExists')
        }else{
            let user = await new User(userData).save()
            return ctx.ok({success:true, user:user.getInfo()})
        }
    }
}

exports.delete = async(ctx) =>{
    const id = ctx.params.id;
    await User.findByIdAndRemove(id);
    return ctx.ok({success:true})
}

exports.update = async(ctx) =>{
    const id = ctx.params.id;
    const reqData = ctx.request.body; 
    if (ctx.auth.id === id || ctx.auth.admin) {
        let user = await User.findByIdAndUpdate(id, { $set: reqData }, { new: true })
        return ctx.ok({ success: true, user: user.getInfo()})
    } else {
        return ctx.send(401, { success: false, error: "PermissionDenied" })
    }
    
}

