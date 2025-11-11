const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlLength: 5,
    maxLength: 50,
  },
  middleName: {
    type: String,
    required: true,
    minlLength: 5,
    maxLength: 50,
  },

  lastName: {
    type: String,
    required: true,
    minlLength: 5,
    maxLength: 50,
  },

  isGold: {
    type: Boolean,
    default: false,
  },

  phone: {
    type: String,
    required: true,
    minlLength: 5,
    maxLength: 50,
  },
});

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer) {
    const Schema = Joi.object({
      firstName: Joi.string().min(5).max(50).required(),

      middleName: Joi.string().min(5).max(50).required(),

      lastName: Joi.string().min(5).max(50).required(),

      isGold: Joi.boolean(),

      phone: Joi.string().min(5).max(50).required(),
    });
    return Schema.validate(customer)

}
exports.Customer = Customer
exports.validate = validateCustomer

