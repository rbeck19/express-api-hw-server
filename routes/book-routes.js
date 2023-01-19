const express = require("express")

const Book = require("../models/book")

const router = express.Router()


//INDEX
//GET /books
router.get("/books", (req, res, next) => {
    Book.find()
        .then((books) => {
            return books.map((book) => book)
        })
        .then((books) => res.status(200).json({ books: books}))
        .catch(next)
})

//SHOW
//GET  /books/:id
router.get("/books/:id", (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            res.status(200).json({ book: book })
        })
        .catch(next)
})

//CREAT 
//POST /books
router.post("/books", (req, res, next) => {
    Book.create(req.body.book)
        .then((book) => {
            res.status(201).json({ book: book })
        })
        .catch(next)
})



module.exports = router