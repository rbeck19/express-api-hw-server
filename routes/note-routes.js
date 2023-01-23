const express = require("express")
const { requireToken } = require("../config/auth")
const { handle404 } = require("../lib/cutom-errors")
const Book = require("../models/book")


//getting notes from book model
const Note = require("../models/book")
const router = express.Router()


//CREATE
//POST /notes
router.post("/notes", requireToken, (req, res, next) => {
    const bookId = req.body.note.bookId
    const note = req.body.note
    //add owner field and gives it ID of user
    note.owner = req.user._id
 
    Book.findById(bookId)
        .then(handle404)
        .then(book => {
            book.notes.push(note)
            return book.save()
        })
        .then(book => {
            res.status(201).json({ book: book })
        })
        .catch(next)
})

//UPDATE
//PATCH /notes/:noteId
router.patch("/notes/:noteId", requireToken, (req, res, next) => {
    const bookId = req.body.note.bookId
    const noteBody = req.body.note

    Book.findById(bookId)
        .then(handle404)
        .then(book => {
            //finding the note by its ID
            const note = book.notes.id(req.params.noteId)
            //setting the new note content to the content being passed in
            note.set(noteBody)
            return book.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//DELETE   /notes/:noteId
router.delete("/notes/:noteId", requireToken, (req, res, next) => {
    const bookId = req.body.note.bookId
    
    Book.findById(bookId)
        .then(handle404)
        .then(book => {
            //finding the correct note to remove
            //.remove then deletes that note
            book.notes.id(req.params.noteId).remove()
            book.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router