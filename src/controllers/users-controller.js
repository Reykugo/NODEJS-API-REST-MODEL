const validator = require('validator');
const User = require('../models/users-model');
const {isEmpty, isString} = require('../utils/functions');

exports.get = async(ctx) =>{
    let users = await User.find({})
    return ctx.ok({users:users.map( user => user.getInfo())});
}

exports.getUser = async(ctx) =>{
    let id = ctx.params.id
    let user = await User.findById(id);
    return ctx.ok({user:user.getInfo()})
}

exports.create = async(ctx) => {
    const reqData = ctx.request.body;
    if(!isString(reqData.password) || !isString(reqData.email)|| !validator.isEmail(reqData.email)){
        return ctx.badRequest({error: 'FieldIncorrectOrMissing'})
    }else{
        const userData = {
            password: reqData.password,
            email: reqData.email.trim(),
            status: reqData.status
        }
        const userExist = await User.findOne({ email: userData.email });
        if(userExist){
            ctx.badRequest('UserAlreadyExists')
        }else{
            let user = await new User(userData).save()
            return ctx.ok({user:user.getInfo()})
        }
    }
}

exports.delete = async(ctx) =>{
    const id = ctx.params.id;
    await User.findByIdAndRemove(id);
    return ctx.ok({})
}

exports.update = async(ctx) =>{
    const id = ctx.params.id;
    const reqData = ctx.request.body; 
    if (ctx.auth.id === id || ctx.auth.admin) {
        if(reqData.email && await User.findOne({email:reqData.email, _id:{ $ne: id }})){
            return ctx.badRequest({error:"EmailAlreadyExists"}) 
        }else{
            let user = await User.findById(id)
            user = Object.assign(user, reqData);
            user.save()
            return ctx.ok({user: user.getInfo()})
        }

        
    } else {
        return ctx.send(401, {error: "PermissionDenied" })
    }
    
}

