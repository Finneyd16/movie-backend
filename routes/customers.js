const { Customer, validate} = require('../model/customer')
const express = require('express')
const router = express.Router()

router.get('/get-all-customers', async(req,res) =>{
    const customer = await Customer.find().sort('name')
     res.send(customer);
})
router.post('/create-customers', async(req,res) =>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      
    });

    customer = await customer.save()
     res.json({
       status: "success",
       message: "customer created succesfully",
     });

     
     
    
})

router.put("/update-customer/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("the customer with the given id not found");

  res.json({
    status: "success",
    message: "customer updated successfully",
  });
});



router.delete("/delete-customer/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(404).send("the customer with the given id not found");

  res.json({
    status: "success",
    message: "customer deleted successfully",
  });
});

router.get("/get-single-customer/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)return res.status(404).send("the customer with the given id not found");
    

  res.send(customer);
});


module.exports = router;