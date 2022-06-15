const pool = require('../utils/pool');

class Author {
    id;
    dob;
    pob;
    name;

    constructor(author) {
        this.id = author.id;
        this.dob = author.dob;
        this.pob = author.pob;
        this.name = author.name;
        author.books ? this.books = author.books : null;
    }

    static async insert({ dob, pob, name }) {
        const { rows } = await pool.query('insert into authors (dob, pob, name) VALUES ($1, $2, $3) returning *;', [dob, pob, name]);
        return new Author(rows[0]);
    }

    async addBookForAuthor(bookId) {
        await pool.query('insert into authors_to_books (book_id, author_id) VALUES ($1, $2) returning *;', [bookId, this.id]);
        return this;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from authors');
        return rows.map((row) => new Author(row));
    }

    static async getAuthorById(id) {
        const { rows } = await pool.query(`select a.*,
                                              coalesce (
                                                json_agg(to_jsonb(b)) FILTER (WHERE b.id is not null), 
                                                null) as books
                                            from books b
                                            join authors_to_books ab on ab.book_id = b.id
                                            join authors a on ab.author_id = a.id
                                            WHERE a.id = $1 
                                            group by a.id;`, [id]);
        return new Author(rows[0]);
    }
}

module.exports = Author;