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
    expect(res.body.name).toEqual('Nelle Harper Lee');
    expect(res.body.pob).toEqual('Monroeville, AL');
  });

  it("POST /author should create a new author with an associated list of books", async () => {
    const resp = await request(app)
      .post("/authors")
      .send({ dob: '01/01/2021', pob: 'Portland, OR', name: 'Some Author', bookIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toEqual('Some Author');
  
    const newAuthor = await request(app).get(`/authors/${resp.body.id}`);
    expect(newAuthor.body.books.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
