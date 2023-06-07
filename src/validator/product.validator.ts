import Joi  from 'joi';
export const ProductValidator = Joi.object({
    name: Joi.string()
        .min(1)
        .max(20)
        .required(),
    description: Joi.string()
        .min(1)
        .max(200)
        .required(),
    currency: Joi.string()
        .lowercase()
        .trim()
        .required(),
    img: Joi.any()
})

