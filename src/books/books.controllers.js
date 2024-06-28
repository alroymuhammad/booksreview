const pool = require('../../db');
const queries = require('./queries');

const getBooks = (req, res) => {
    pool.query(queries.getBooks, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookById = (req, res) => {
    const book_id = parseInt(req.params.book_id);
    pool.query(queries.getBookById, [book_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addBook = (req, res) => {
    const { book_id, book_title, book_author, book_pd, book_description } = req.body;
    
    // Check if the book ID already exists
    pool.query(queries.checkIdExists, [book_id], (error, results) => {
        if (error) {
            console.error('Error checking book ID:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        if (results.rows.length > 0) {
            // Book ID already exists
            return res.status(400).json({ error: 'Book ID already exists' });
        } else {
            // Book ID does not exist, proceed to add the book
            pool.query(queries.addBook, [book_id, book_title, book_author, book_pd, book_description], (error, results) => {
                if (error) {
                    console.error('Error adding book:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                res.status(201).json({ message: 'Book added successfully' });
            });
        }
    });
};

const removeBook = (req, res) => {
    const book_id = parseInt(req.params.book_id);
    pool.query(queries.getBookById, [book_id], (error, results) => {
        const noBookFound = !results.rows.length;
        if(noBookFound){
            res.send('The book doesn\'t exist in the database');
        }
        pool.query(queries.removeBook, [book_id], (error, results) => {
            if(error) throw error;
            res.status(200).send('Book removed succesfully');
        });
    }) 
};

const updateBook = (req, res) => {
    const book_id = parseInt(req.params.book_id);
    pool.query(queries.getBookById, [book_id], (error, results) => {
        const noBookFound = !results.rows.length;
        if(noBookFound){
            res.send('The book doesn\'t exist in the database');
        }
        pool.query(queries.getBookById, [book_id], (error, results) =>{
            if(error) throw error;
            res.status(200).send('Book is updated');
        })
    })
};

module.exports = {getBooks, getBookById, addBook, removeBook, updateBook};