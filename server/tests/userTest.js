import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import sucessfulUser from './mockInput';

const { expect } = chai;

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
});



