const pool = require('../utils/pool');
const Author = require('./Author');

class Book {
    id;
    title;
    publisher;
    released;

    constructor(book) {
        this.id = book.id;
        this.title = book.title;
        this.publisher = book.publisher;
        this.released = book.released;
        book.authors ? this.authors = book.authors.map((author) => new Author(author)) : null;
    }

    static async insert({ title, publisher, released }) {
        const { rows } = await pool.query('insert into books (title, publisher, released) VALUES ($1, $2, $3) returning *;', [title, publisher, released]);
        return new Book(rows[0]);
    }

    async addAuthorForBook(authorId) {
        await pool.query('insert into authors_to_books (book_id, author_id) VALUES ($1, $2) returning *;', [this.id, authorId]);
        return this;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from books');
        return rows.map((row) => new Book(row));
    }

    static async getBookById(id) {
        const { rows } = await pool.query(`select b.*,
                                              coalesce (
                                                json_agg(to_jsonb(a)) FILTER (WHERE a.id is not null), 
                                                '[]') as authors
                                            from books b
                                            join authors_to_books ab on ab.book_id = b.id
                                            join authors a on ab.author_id = a.id
                                            WHERE b.id = $1 
                                            group by b.id;`, [id]);
        return new Book(rows[0]);
    }
}

module.exports = { Book };