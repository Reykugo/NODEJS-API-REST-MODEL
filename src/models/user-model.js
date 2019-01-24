/*
This file is used to create schema of User for bdd
*/

const config = require('../config');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema; //Create mongoose Schema

let schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: {type: String, required:true, enum:["activated", "closed", "pending"], default:"activated"},
    admin: {type: Boolean, required:true, default:false},
    createdOn: { type: Date, default: Date.now },
})

/**
 This function is called before storing user in database
 **/
schema.pre('save', function (next) {
    let user = this;
    // if password is not modified or created
    if (!user.isModified('password')) return next();
    //else...
    bcrypt.genSalt(config.SALT, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/** 
 Comparing user password and specified password
 * @param {String} candidatePassword Password to compare
 * @return {bool}                    Return true if match else return false
 **/
schema.methods.comparePasswords = function (candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password);
};


schema.methods.getInfo = function (){
    return {
        id: this.id,
        name: this.name,
        username:this.username,
        email:this.email,
        status:this.status,
        admin: this.admin,
        createdOn: this.createdOn
    }
}

module.exports = mongoose.model('User', schema, 'user');


