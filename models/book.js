const mongoose = require("mongoose")
const noteSchema = require("./note")

const Schema = mongoose.Schema

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    notes: [noteSchema]
},{
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book