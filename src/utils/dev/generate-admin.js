require('dotenv').config()
const config = require('../../config')
var mongoose = require("mongoose");
require('../../models/User')

//Connect to database
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.DBURI, function (err) {
    if (err) {
        throw err;
    } else {
        var User = mongoose.model("User")
        var username = process.argv[2]
        var password = process.argv[3]
        var email = process.argv[4]
        User.findOne({ "access": "admin" }, function (err, findedUser) {
            console.log(findedUser)
            if (!findedUser) {
                var user = new User({
                    name: "admin", username: username,
                    email: email,
                    password: password,
                    admin:true,
                    status="activated",
                    isFirstLogin: false
                });
                user.save().catch(e => { throw e })
            }
        })
    }
})

