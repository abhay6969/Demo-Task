import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { readJson, writeJson } from "../utils/fileUtils.js";

const BOOKS_FILE = "books.json";

export const addBook = async (req, res) => {
	try {
		console.log(req.body);
		const { title, author, genre, publishedYear } = req.body;
		const books = await readJson(BOOKS_FILE);
		const existingBook = books.find((b) => b.title === title);
		if (existingBook) {
			return res.status(400).json({ message: "Book already exists" });
		}

		const newBook = {
			id: uuid(),
			title,
			author,
			genre,
			publishedYear,
			userId: req.user.id,
		};

		books.push(newBook);
		await writeJson(BOOKS_FILE, books);

		return res.status(201).json({ message: "Book created successfully", book: newBook });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getBook = async (req, res) => {
	try {
		const books = await readJson(BOOKS_FILE);
		return res.status(200).json({ books });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getBookById = async (req, res) => {
	try {
		const { id } = req.params;
		const books = await readJson(BOOKS_FILE);
		const book = books.find((b) => b.id === id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		return res.status(200).json({ book });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updateBook = async (req, res) => {
	try {
		const { id } = req.params;
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ message: "Authorization token missing or invalid" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const books = await readJson(BOOKS_FILE);
		const book = books.find((b) => b.id === id);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		if (book.userId !== decoded.id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		const { title, author, genre, publishedYear } = req.body;
		if (title) book.title = title;
		if (author) book.author = author;
		if (genre) book.genre = genre;
		if (publishedYear) book.publishedYear = publishedYear;

		await writeJson(BOOKS_FILE, books);

		return res.status(200).json({ message: "Book updated successfully", book });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteBook = async (req, res) => {
	try {
		const { id } = req.params;
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ message: "Authorization token missing or invalid" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const books = await readJson(BOOKS_FILE);
		const book = books.find((b) => b.id === id);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		if (book.userId !== decoded.id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		const updatedBooks = books.filter((b) => b.id !== id);
		await writeJson(BOOKS_FILE, updatedBooks);

		return res.status(200).json({ message: "Book deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchBooks = async (req, res) => {
  try {
    const { genre } = req.query;
    const books = await readJson("books.json");

    if (!genre) {
      return res.status(400).json({ message: "Genre query parameter is required" });
    }

    const filteredBooks = books.filter(book =>
      book.genre.toLowerCase() === genre.toLowerCase()
    );

    res.status(200).json({ books: filteredBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
