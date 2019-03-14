const mongoose = require('mongoose');

exports.connect = dbURI => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
        console.log("connected to db")
    }).catch(err => {
        throw (err)
    })
}