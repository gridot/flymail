import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import sucessfulUser from './mockInput';

const { expect } = chai;

chai.use(chaiHttp);

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



