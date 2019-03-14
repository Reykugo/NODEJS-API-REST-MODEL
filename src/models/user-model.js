/*
This file is used to create schema of User for bdd
*/

const config = require('../config');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema; //Create mongoose Schema
let joi = require('joi')
let userValidator = require('../utils/validators/user-validator');

let schema = new Schema({
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true, select:false },
    admin: {type: Boolean, required:true, default:false},
    createdOn: { type: Date, default: Date.now },
})

/**
 This function is called before storing user in database
 **/


schema.pre('save', async function() {
    // if password is not modified or created
    if (this.isModified('password')){
        let salt = await bcrypt.genSalt(parseInt(config.SALT));
        let hash = await bcrypt.hash(this.password, salt);
        this.password = hash
    }
});

/** 
 Comparing user password and specified password
 * @param {String} candidatePassword Password to compare
 * @return {bool}                    Return true if match else return false
 **/
schema.methods.comparePasswords = function (candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

schema.methods.validation = function(obj, shemaType){
    let joiSchema = userValidator[shemaType];
    return joi.validate(obj, joiSchema);
}


module.exports = mongoose.model('User', schema, 'user');


