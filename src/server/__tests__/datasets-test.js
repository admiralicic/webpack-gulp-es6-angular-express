import app from '../app';
import config from 'config';
import request from 'supertest';

describe('GET /datasets/cars', () => {
  it('should respond with a JSON array of cars data', (done) => {
    request(app)
      .get('/datasets/cars')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.Array();
        done();
      });
  });

  it('should respond with a JSON array of cars from Europe', (done) => {
    request(app)
      .get('/datasets/cars?origin=Europe')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        _.each(res.body, (car) => {
          car.origin.should.equal('Europe');
        });
        done();
      });
  });

});

describe('GET /datasets/car/:id', () => {
  it('should return JSON data from the first car in the dataset', (done) => {
    request(app)
      .get('/datasets/cars/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.Object();
        res.body.should.have.property('acceleration');
        res.body.acceleration.should.be.Number();
        res.body.should.have.property('car');
        res.body.car.should.be.String();
        res.body.should.have.property('cylinders');
        res.body.cylinders.should.be.Number();
        res.body.should.have.property('displacement');
        res.body.displacement.should.be.Number();
        res.body.should.have.property('horsepower');
        res.body.horsepower.should.be.Number();
        res.body.should.have.property('id');
        res.body.id.should.be.Number();
        res.body.should.have.property('model');
        res.body.model.should.be.Number();
        res.body.should.have.property('mpg');
        res.body.mpg.should.be.Number();
        res.body.should.have.property('origin');
        res.body.origin.should.be.String();
        res.body.should.have.property('weight');
        res.body.weight.should.be.Number();
        done();
      });
  });

  it('should return a 404 error code when requesting a car with an invalid id', (done) => {
    request(app)
      .get('/datasets/cars/450014540')
      .expect(404, done);
  });

});