const Joi = require("joi");

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  //   first_name: Joi.string().min(1).required(),
  //   last_name: Joi.string().min(1).required(),
});

module.exports = UserSchema;
