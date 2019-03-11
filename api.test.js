const request = require('supertest');
const app = require('./index');

describe ('check findPath endpoint', () => {
  test('should not return way with one gate', done => {
    request(app)
      .get('/findPath?spaceship=111&sector=136')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const oneGateWay = res.body.filter(way => way.gates.length < 1);
        expect(oneGateWay).toHaveLength(0);
        done();
      });
  });
  test('should return ways with two gates', done => {
    request(app)
      .get('/findPath?spaceship=10&sector=96')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const twoGateWay = res.body.filter(way => way.gates.length === 2);
        expect(twoGateWay.length).toBeGreaterThan(0);
        done();
      });
  });
  test('should contain [14, 16] gates from 1 security level', done => {
    request(app)
      .get('/findPath?spaceship=10&sector=30')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const [levelOneSecurity] = res.body.filter(way => way.securityLevel  === 1);
        expect(levelOneSecurity.gates).toEqual(['14', '16']);
        done();
      });
  });
});

describe ('check spaceship endpoints', () => {
  test('should return list of the last sector for and ways ship', done => {
    request(app)
      .get('/spaceship?spaceship=10')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const { sector, ways } = res.body;
        expect(sector).toEqual(10);
        exepct(ways.length).toEqual(2);
        done();
      });
  });
  test('should return list of spaceships', done => {
    request(app)
      .get('/spaceships')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        const shipsCount = res.body.length;
        expect(shipsCount).toEqual(2);
        done();
      });
  });
});
