const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const db = require("./config/db")
const PORT = 8000

const bookRoutes = require("./routes/book-routes")
const noteRoutes = require("./routes/note-routes")
const userRoutes = require("./routes/user.routes")
const requestLogger = require("./lib/request-logger")


mongoose.set("strictQuery", true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(cors({ origin: `http://127.0.0.1:5500` }))

app.use(express.json())
app.use(requestLogger)
app.use(bookRoutes)
app.use(noteRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

module.exports = app