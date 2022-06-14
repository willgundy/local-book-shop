const pool = require('../utils/pool');
const Book = require('./Book');

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
        // author.books ? this.books = author.books.map((item) => new Book(item)) : null;
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
        return rows.map((row) => new Author(row));
    }
}

module.exports = Author;