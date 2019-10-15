const test_app = require('../../auth-server');
import mongoose from 'mongoose';

import supertest from 'supertest';
import chai from 'chai';

var assert = chai.assert;
const request = require('supertest');

/*  Basic Functionality sanity checks to make sure things are still working
    This is not a full suite of tests, just functional:

    POST  /v1/auth/register "auth header basic auth with password and unique username"          should return JWT and 201 status
    POST  /v1/auth/register "auth header basic auth with password and existing username"        should return 403 status
    POST  /v1/auth/register "auth header basic auth not set"                                    should return 403 status
    POST  /v1/auth/login    "auth header basic auth with correct password and username"         should return JWT and 200 status
    POST  /v1/auth/login    "auth header basic auth with invalid password and valid username"   should return 403 status
    POST  /v1/auth/login    "auth header basic auth with invalid username and valid password"   should return 403 status
    POST  /v1/auth/login    "auth header basic auth not set"                                    should return 403 status
*/

describe('Authentication API', function() {
  describe('Register', function() {
    it('Return JWT when passed valid username and password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/register')
        .auth('username', 'password123')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err: any, res: supertest.Response) => {
          assert.property(res.body, 'token');
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('Returns 403 when passed existing username and password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/register')
        .auth('username', 'password123')
        .expect(403)
        .end((err: any, res: supertest.Response) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('Returns 403 when not passed username and password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/register')
        .expect(403)
        .end((err: any, res: supertest.Response) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  describe('Login', function() {
    it('Return JWT when passed existing username and password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/login')
        .auth('username', 'password123')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err: any, res: supertest.Response) => {
          assert.property(res.body, 'token');
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('Returns 403 when passed invalid username and valid password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/login')
        .auth('invalidusername', 'password123')
        .expect(403)
        .end((err: any, res: supertest.Response) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('Returns 403 when passed valid username and invalid password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/login')
        .auth('username', 'password1234')
        .expect(403)
        .end((err: any, res: supertest.Response) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('Returns 403 when not passed username and password', function(done) {
      request(test_app) // this returns a SuperTest object
        .post('/v1/auth/login')
        .expect(403)
        .end((err: any, res: supertest.Response) => {
          // TODO: Need a better way to kill mongoose
          mongoose.connection.close(() => {
            if (err) {
              return done(err);
            }
            done();
          });
        });
    });
  });
});
