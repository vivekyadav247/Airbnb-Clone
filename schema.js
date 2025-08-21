const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        price : Joi.number().min(0).required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        image : Joi.string().allow(null, ''),
    }).required(),
}) ;

// Review Schema
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(0).max(5),
        comment : Joi.string().required(),
    }).required(),
});