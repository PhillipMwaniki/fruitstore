let mongoose = require("mongoose");
let Fruit = require('../models/fruits');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Fruits', () => {
    beforeEach((done) => {
        Fruit.remove({}, (err) => {
            done();
        });
    });
    describe('/GET fruits', () => {
        it('it should GET all the fruits', (done) => {
            chai
                .request(server)
                .get('/fruits')
                .end((err, res) => {
                    res
                        .should
                        .have
                        .status(200);
                    res
                        .body
                        .should
                        .be
                        .a('array');
                    res
                        .body
                        .length
                        .should
                        .be
                        .eql(0);
                    done();
                });
        });
    });

    describe('/POST fruit', () => {
        it('it should not POST a fruit with count less than 0', (done) => {
            let fruit = {
                name: "Banana",
                count: 0
            }
            chai
                .request(server)
                .post('/fruits')
                .send(fruit)
                .end((err, res) => {
                    should.exist(res.body);
                    res
                        .should
                        .have
                        .status(200);
                    res
                        .body
                        .should
                        .be
                        .a('object');
                    res
                        .body
                        .should
                        .have
                        .property('errors');
                    res
                        .body
                        .errors
                        .should
                        .have
                        .property('count');
                    res
                        .body
                        .errors
                        .count
                        .should
                        .have
                        .property('kind')
                        .eql('min');
                    done();
                });
        });
        it('it should POST a fruit ', (done) => {
            let fruit = {
                name: "Apple",
                count: "5"
            }
            chai
                .request(server)
                .post('/fruits')
                .send(fruit)
                .end((err, res) => {
                    should.exist(res.body);
                    res
                        .should
                        .have
                        .status(200);
                    res
                        .body
                        .should
                        .be
                        .a('object');
                    res
                        .body
                        .should
                        .have
                        .property('message')
                        .eql('Fruit successfully added!');
                    res
                        .body
                        .fruits
                        .should
                        .have
                        .property('name');
                    res
                        .body
                        .fruits
                        .should
                        .have
                        .property('count');
                    done();
                });
        });
    });

});