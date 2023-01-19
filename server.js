const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const db = require("./config/db")
const PORT = 8000

const bookRoutes = require("./routes/book-routes")

mongoose.set("strictQuery", true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(cors({ origin: `http://127.0.0.1:5500` }))

app.use(express.json())
app.use(bookRoutes)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

module.exports = app