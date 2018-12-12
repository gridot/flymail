import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import {
  sucessfulUser, invalidFirstName, invalidLastName, invalidUserEmail, invalidPassword, successfulOrder, invalidContent, invalidWeight, invalidPickup, invalidDest, invalidReceiver, invalidEmail, invalidPhone
} from './mockInput';

const { expect } = chai;
let userToken;
let adminToken;

chai.use(chaiHttp);

describe('Tests for Homepage and invalid url endpoints', () => {
  describe('Test for Homepage API Endpoint', () => {
      it('Should return status code 200 for success', (done) => {
          chai.request(app)
              .get('/api/v1')
              .end((error, response) => {
                  expect(response).to.have.status(200);
                  expect(response.body.message).to.equal('Welcome to Flymail, your package is safe with us');
                  done();
              });
      });
  });
  describe('Test for Invalid URL', () => {
      it('Should return status code 404 for failure', (done) => {
          chai.request(app)
              .get('/nonexistence/url')
              .end((error, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body.message).to.equal('Sorry! This page does not exist, enter a valid url.');
                  done();
              });
      });
  });
})

describe('Generate Token for testing Order Endpoints', () => {
    it('should return token for user successful login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'codegirls@gmail.com',
          password: 'janedot'
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          userToken = response.body.token;
          done();
        });
    });
    it('should return token for admin successful login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'gritdot@gmail.com',
          password: 'admindot'
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          adminToken = response.body.token;
          done();
        });
    });
  });

describe('Test for Signup User', () => {
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(sucessfulUser)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('token');
        done();
      });
  });

  it('Should return 400 for invalid input', (done) => {
    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(invalidFirstName)
        done()
        .send(invalidLastName)
        done()
        .send(invalidUserEmail)
        done()
        .send(invalidPassword)
        done()
        .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.message).to.equal('Please make sure to input correct values');
            done();
        });
});       

});

describe('Test for Post parcel', () => {
  it('Should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/parcels')
      .set('authorization', userToken)
      .send(successfulOrder)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.equal('Your order was placed successfully');
        done();
      });
  });

  it('Should return 400 for inavlid inputs', (done) => {
    chai.request(app)
        .post('/api/v1/parcels')
        .send(invalidContent)
        done()
        .send(invalidWeight)
        done()
        .send(invalidPickup)
        done()
        .send(invalidDest)
        done()
        .send(invalidReceiver)
        done()
        .send(invalidEmail)
        done()
        .send(invalidPhone)
        done()
        .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.message).to.equal('Please make sure to input correct values');
            done();
        });
});       

});

