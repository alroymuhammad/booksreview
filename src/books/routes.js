const { Router } = require('express');
const booksController = require('./books.controllers');

const router = Router();

router.get('/', booksController.getBooks);
router.post('/', booksController.addBook);
router.get('/:book_id', booksController.getBookById);
router.put('/:book_id', booksController.updateBook);
router.delete('/:book_id', booksController.removeBook);


module.exports = router;
