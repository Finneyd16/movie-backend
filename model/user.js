const Joi = require("joi");
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
 name: {
type: String,
required: true,
minlength: 5,
maxlength: 50
},
email: {
type: String,
required: true,
minlength: 5,
maxlength: 255,
unique: true
},
password: {
type: String,
required: true,
minlength: 5,
maxlength: 1024
}
});
 
const User = mongoose.model("User", userschema);

function validateUser(user) {
 const schema = Joi.object({
name: Joi.string().min(5).max(50).required(),
email: Joi.string().min(5).max(255).required().email(),
password: Joi.string().min(5).max(255).required()
 });
 return schema.validate(user);
}

function validateLogin(auth) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(auth);
}


exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLogin;

