const request = require('supertest');
const app = require('../server'); // Import the configured express app

describe('GET /wimbledon', () => {
  it('should return 200 OK with data for a valid year', async () => {
    const res = await request(app).get('/wimbledon?year=2023');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('champion', 'Carlos Alcaraz');
    expect(res.body).toHaveProperty('year', 2023);
  });

  it('should return 404 Not Found for a year without data', async () => {
    const res = await request(app).get('/wimbledon?year=1990');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Wimbledon final data for the year 1990 not found.');
  });

  it('should return 400 Bad Request for a missing year query', async () => {
    const res = await request(app).get('/wimbledon');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'A valid 4-digit year must be provided.');
  });

  it('should return 400 Bad Request for an invalid year format', async () => {
    const res = await request(app).get('/wimbledon?year=abc');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'A valid 4-digit year must be provided.');
  });
});

describe('Not Found Handler', () => {
  it('should return 404 for a route that does not exist', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toContain('Not Found');
  });
});