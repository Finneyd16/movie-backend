const {Rental, validate} = require('../model/rental')
const {Customer} = require('../model/customer')
const {Movie} = require('../model/movie')
const express = require('express')
const router = express.Router()


router.get("/get-all-rental", async (req, res) => {
  const rental = await rental.find().sort("-dateOut");
  res.send(rental);
});


router.post('/create-rentals', async(req, res) =>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('invalid customer')

     const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send('invalid movie')

    if (movie.numberInStock === 0) return res.status(404).send('movie is out of stock')

    let rental = new Rental({
        customer:{
             _id:customer._id,
             firstName: customer.firstName,
             middleName: customer.middleName,
             lastName: customer.lastName,
             phone: customer.phone,
        },

        movie:{
             _id:movie._id,
             title: movie.title,
             dailyRentalRate: movie.dailyRentalRate
        },
        rentalFee: request.body.rentalFee
    })

    rental = await rental.save()
    movie.numberInStock--;
    movie = await movie.save()
    res.json({
    status: "success",
    message: "rental created successfully",
  });
});

 router.get("/get-single-rental/:id", async (req, res) => {
   const rental = await rental.findById(req.params.id);
   if (!rental)
     return res.status(404).send("the rentalwith the given id not found");

   res.send(rental);
 });









module.exports = router;