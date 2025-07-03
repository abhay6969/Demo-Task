#📚 Book API — Postman Usage Guide
A simple REST API to manage books with user authentication using JWT and file-based storage (fs.promises). This guide helps you test everything using Postman.

#🌐 Base URL
http://localhost:3000/api


🔐 Authentication Routes
1. 📝 Sign Up
URL: POST /auth/signup

Body (raw → JSON):
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456"
}


2. 🔑 Sign In
URL: POST /auth/signin

Body (raw → JSON):
{
  "email": "alice@example.com",
  "password": "123456"
}

✅ Response:
{
  "message": "Login successful",
  "token": "<your_token_here>"
}
🔁 Copy this token. You'll need it for all protected routes.



#📚 Book Routes

3. ➕ Add a Book
URL: POST /books

Headers:

Authorization: Bearer <your_token>

Content-Type: application/json

Body (raw → JSON):
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "publishedYear": 1988
}


4. 📖 Get All Books
URL: GET /books

No Auth Required


5. 📘 Get Book by ID
URL: GET /books/:id

Example: GET /books/1a2b3c4d5e

No Auth Required


6. ✏️ Update Book
URL: PUT /books/:id

Headers:

Authorization: Bearer <your_token>

Content-Type: application/json

Body (raw → JSON):
{
  "title": "Updated Title",
  "author": "New Author",
  "genre": "Updated Genre",
  "publishedYear": 2020
}
⚠️ Only the user who added the book can update it.


7. ❌ Delete Book
URL: DELETE /books/:id

Headers: Authorization: Bearer <your_token>

⚠️ Only the user who added the book can delete it.


8. 🔍 Search Books by Genre
URL: GET /books/search

Query Params: genre (required) — e.g., Fiction, Thriller, Romance, etc.

Auth: ❌ Not required

🧠 Postman Tips
Use "Bearer Token" in the Authorization tab after login.

Set body type to raw and format to JSON when sending payloads.

You can save your token as a variable in a Postman environment for reuse.

📂 Sample JSON Files
data/users.json – Stores all registered users

data/books.json – Stores all books added by users

#Add this in the  env File:
JWT_SECRET = bookstore