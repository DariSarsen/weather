const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 

const expect = chai.expect;

chai.use(chaiHttp);

describe('Weather API', () => {
  describe('GET /graphql', () => {
    it('should return weather data for a given city', (done) => {
      chai.request(app)
        .post('/graphql')
        .send({ query: 'query { getWeatherByCityName(city: "Almaty") { city, country, temperature, humidity, windSpeed, description } }' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data.getWeatherByCityName).to.have.property('city').that.is.a('string');
          expect(res.body.data.getWeatherByCityName).to.have.property('country').that.is.a('string');
          expect(res.body.data.getWeatherByCityName).to.have.property('temperature').that.is.a('number');
          expect(res.body.data.getWeatherByCityName).to.have.property('humidity').that.is.a('number');
          expect(res.body.data.getWeatherByCityName).to.have.property('windSpeed').that.is.a('number');
          expect(res.body.data.getWeatherByCityName).to.have.property('description').that.is.a('string');
          done();
        });
    });

    it('should return an error if the city does not exist', (done) => {
      chai.request(app)
        .post('/graphql')
        .send({ query: 'query { getWeatherByCityName(city: "NonexistentCity") { city, country, temperature, humidity, windSpeed, description } }' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].message).to.equal('Failed to fetch weather data');
          done();
        });
    });

  });
});
