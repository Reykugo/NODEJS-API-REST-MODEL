require('dotenv').config();
const mongoose = require("mongoose");
const User = require("../src//models/user-model");
const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require('../src/config');


chai.use(chaiHttp);
const should = chai.should();
const apiUrl = `localhost:${config.PORT}/api`;

describe('CRUD users', () => {

    describe('Create user', () =>{
        it('should create a user', (done) =>{
            chai.request(apiUrl)
            .post('/users')
            .send({ "email": "toto@gmail.com", "password":"password"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    });
    
})