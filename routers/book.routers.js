import express from 'express'
import { addBook, deleteBook, getBook, getBookById, searchBooks, updateBook } from '../controllers/book.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/books', getBook)
router.get('/books/:id', getBookById)
router.post('/books', authenticate, addBook)
router.put('/books/:id', authenticate, updateBook)
router.delete('/books/:id', authenticate, deleteBook)
router.get("/search", searchBooks);

export default router