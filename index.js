const express = require('express')
const app = express()
const mongoose = require ('mongoose')
const genre = require('./routes/genre')
const customer = require('./routes/customers')
const movie = require('./routes/movies')
const rental = require('./routes/rentals')


mongoose.connect("mongodb://localhost/moviedatabase")
.then(() => console.log('connected to moviedatabase...'))
.catch(err => console.log(err,'connection failed... '))

app.use(express.json());
app.use('/api/moviedocuments/genre', genre)
app.use('/api/movieDocuments/customers', customer)
app.use("/api/movieDocuments/movies", movie);
app.use("/api/movieDocuments/rentals", rental);

const port = process.env.PORT || 3001

app.listen(port,console.log(`listening on port${port}...`))