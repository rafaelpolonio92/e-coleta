const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');

// add joi-objectId to Joi
Joi.objectId = joiObjectId(Joi);

const pointSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  whatsapp: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  uf: Joi.string().required().max(2),
  items: Joi.string().required(),
});

export { pointSchema };