const getBooks = 'SELECT * FROM books';
const getBookById = 'SELECT * FROM books WHERE book_id = $1';
const checkIdExists = 'SELECT s FROM books s WHERE s.book_id = $1';
const addBook = 'INSERT INTO books (book_id, book_title, book_author, book_pd, book_description) VALUES ($1, $2, $3, $4, $5)';
const removeBook = 'DELETE FROM books WHERE book_id = $1';
const updateBook = 'UPDATE books SET book_title = $1, book_author = $2, book_pd = $3, book_description = $4 WHERE book_id = $5';


module.exports = { getBooks, getBookById, checkIdExists, addBook, removeBook, updateBook };