const express = require('express')
const app = express()
const mongoose = require ('mongoose')
const genre = require('./routes/genre')
const customer = require('./routes/customers')
const movie = require('./routes/movies')
const rental = require('./routes/rentals')
const user = require('./routes/users')
const auth = require('./routes/auth')
const config = require('config')

if (!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR: jwtPrivateKey is not defined.")
  process.exit(1);
}


mongoose.connect("mongodb://localhost/moviedatabase")
.then(() => console.log('connected to moviedatabase...'))
.catch(err => console.log(err,'connection failed... '))

app.use(express.json());
app.use('/api/moviedocuments/genre', genre)
app.use('/api/movieDocuments/customers', customer)
app.use("/api/movieDocuments/movies", movie);
app.use("/api/movieDocuments/rentals", rental);
app.use("/api/movieDocuments/users", user);
app.use("/api/movieDocuments/login", auth);

const port = process.env.PORT || 3003

app.listen(port,console.log(`listening on port${port}...`))