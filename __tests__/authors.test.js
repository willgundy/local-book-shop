const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors w/o nested books', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(3);
    const melville = res.body.find((author) => author.name === 'Herman Melville');
    expect(melville.pob).toEqual('New York, NY');
    expect(melville.dob).toEqual('08/01/1819');
  });

  //need to write in test for nested books
  it('should return a single books details', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    console.log(res.body);
    expect(res.body.name).toEqual('Nelle Harper Lee');
    expect(res.body.pob).toEqual('Monroeville, AL');
  });

  // it("POST /book should create a new book with an associated author", async () => {
  //   const resp = await request(app)
  //     .post("/books")
  //     .send({ title: 'bookie', publisher: 'dunno', released: 1960, authorIds: [1, 2] });
  //   expect(resp.status).toBe(200);
  //   expect(resp.body.title).toEqual('bookie');
  //   expect(resp.body.publisher).toEqual('dunno');
  //   expect(resp.body.released).toEqual(1960);
  
  //   const newBook = await request(app).get(`/books/${resp.body.id}`);
  //   expect(newBook.body.authors.length).toBe(2);
  // });

  afterAll(() => {
    pool.end();
  });
});
