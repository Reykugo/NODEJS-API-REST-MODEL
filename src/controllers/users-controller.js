const User = require('../models/user-model');

exports.get = async(ctx) =>{
    let users = await User.find({})
    return ctx.ok({users:users});
}

exports.getUser = async(ctx) =>{
    let id = ctx.params.id
    if(ctx.auth.id === id || ctx.auth.admin){
        let user = await User.findById(id);
        if(user)
            return ctx.ok({user:user})
        else
            return ctx.notFound({error:"NotFound"})
    }else{
        return ctx.send(401, {error:"PermissionDenied"})
    }
}

exports.create = async(ctx) => {
    const reqData = ctx.request.body;
    let user = new User(reqData)
    let userIsNotvalid = user.validateSync()
    if(userIsNotvalid){
        return ctx.badRequest({error: 'FieldIncorrectOrMissing'})
    }else{
        const userExist = await User.findOne({ email: reqData.email });
        if(userExist){
            ctx.badRequest('UserAlreadyExists')
        }else{
            let user = await new User(reqData).save()
            return ctx.ok({user:user})
        }
    }
}

exports.delete = async(ctx) =>{
    const id = ctx.params.id;
    await User.findByIdAndRemove(id);
    return ctx.ok()
}

exports.update = async(ctx) =>{
    const id = ctx.params.id;
    const reqData = ctx.request.body; 
    if (ctx.auth.id === id) {
        if(reqData.email && await User.findOne({email:reqData.email, _id:{ $ne: id }})){
            return ctx.badRequest({error:"EmailAlreadyExists"}) 
        }else{
            let user = await User.findById(id)
            if(user){
                user = Object.assign(user, reqData);
                let userIsNotValid = user.validateSync()
                if(userIsNotValid){
                    return ctx.badRequest({error:"FieldIncorrectOrMissing"})
                }else{
                    await user.save()
                    return ctx.ok({user: user})
                }
            }else{
                return ctx.notFound({error:"NotFound"})
            }
        }       
    } else {
        return ctx.send(401, {error: "PermissionDenied" })
    }
    
}

