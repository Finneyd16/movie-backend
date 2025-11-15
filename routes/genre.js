const {Genre, validate} = require('../model/genre')
const express = require('express')
const router = express.Router()

router.get('/get-all-genres', async(req, res)=> {
    const genre = await Genre.find().sort('name');
    res.send(genre)
})
router.post('/create-genre', async(req,res)=>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

        let genre = new Genre({
            name:req.body.name
        })
        
        genre = await genre.save()
        res.json({
            status:'success',
            message:'genre created succesfully'
        })



})
router.delete('/delete.genre/:id', async(req,res) =>{
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (error) return res.status(400).send(error.details[0].message);
})

router.put('/update-genre/:id', async(req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name}, {new: true})

    if (!genre) return res.status(404).send('the genre with the given id not found');

    res.json({
        status: 'success',
        message:'genre updated successfully'
    })
})


router.delete('/delete-genre/:id', async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
   if (!genre) return res.status(404).send('the genre with the given id not found');

   res.json({
        status: 'success',
        message:'genre deleted successfully'
    })
})

router.get('/get-single-genre/:id', async(req, res) =>{
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('the genre with the given id not found');

    res.send(genre)

})




module.exports = router;