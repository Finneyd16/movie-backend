const { Movie, validate } = require('../model/movie')
const { Genre } = require("../model/genre");
const express = require('express')
const router = express.Router()


router.get('/get-all-movies', async(req, res) =>{
    const movie = await Movie.find().sort('title')
    res.send(movie)
})

router.post('/create-movies', async(req, res) =>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('the genre with the given Id not found')

    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
       
    }) 
   
    movie = await movie.save()
    res.json({
        status:'success',
        message: 'movie created successfully'
    })
})


router.put("/update-movie/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.findByIdAndUpdate(req.body.genreId);
   if (!genre) return res.status(400).send("the genre with the given Id not found");

   const movie = await Movie.findByIdAndUpdate(
     req.params.id,
     {
       title: req.body.title,
       genre: {
         _id: genre._id,
         name: genre.name,
       },
       numberInStock: req.body.numberInStock,
       dailyRentalRate: req.body.dailyRentalRate,
     },
     { new: true }
   );

   if (!movie) return res.status(404).send("the movie with the given id not found");

    res.json({
      status: "success",
      message: "movie updated successfully",
    });
})

router.delete("/delete-movie/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie)
    return res.status(404).send("the movie with the given id not found");

  res.json({
    status: "success",
    message: "movie deleted successfully",
  });

 
});
 router.get("/get-single-movie/:id", async (req, res) => {
   const movie = await Movie.findById(req.params.id);
   if (!movie) return res.status(404).send("the movie with the given id not found");

   res.send(movie);
 });

 router.get("/genre/:genreId", async (req, res) => {
   const genreId = req.params.genreId;

   const movies = await Movie.find({ "genre._id": genreId });

   if (!movies || movies.length === 0) return res.status(404).send("No movies found for this genre.");

   res.json(movies);
 });




module.exports = router;























