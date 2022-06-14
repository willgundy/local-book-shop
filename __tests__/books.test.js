const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books w/o nested authors', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(2);
    const mockingbird = res.body.find((book) => book.title === 'To Kill A Mockingbird');
    expect(mockingbird).toHaveProperty('title', 'To Kill A Mockingbird');
    expect(mockingbird).toHaveProperty('released', 1960);
  });

  //need to write in test for nested authors
  it('should return a single books details', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('To Kill A Mockingbird');
    expect(res.body.released).toEqual(1960);
  });

  it("POST /book should create a new book with an associated author", async () => {
    const resp = await request(app)
      .post("/books")
      .send({ title: 'bookie', publisher: 'dunno', released: 1960, authorIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toEqual('bookie');
    expect(resp.body.publisher).toEqual('dunno');
    expect(resp.body.released).toEqual(1960);
  
    const newBook = await request(app).get(`/books/${resp.body.id}`);
    expect(newBook.body.authors.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
