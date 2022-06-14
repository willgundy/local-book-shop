const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //test for getting a list of books
  it('should return a list of books w/o nested authors', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(2);
    const mockingbird = res.body.find((book) => book.title === 'To Kill A Mockingbird');
    expect(mockingbird).toHaveProperty('title', 'To Kill A Mockingbird');
    expect(mockingbird).toHaveProperty('released', 1960);
  });

  afterAll(() => {
    pool.end();
  });
});
