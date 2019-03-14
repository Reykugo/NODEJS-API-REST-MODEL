/*
This file is used to create schema of Name for bdd
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema; //Create mongoose Schema

let schema = new Schema({
    createdOn: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Name', schema, 'name');


