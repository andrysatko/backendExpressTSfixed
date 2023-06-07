import Joi  from 'joi';
export const authValidator = Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(20)
            .required(),
        lastname: Joi.string()
            .min(1)
            .max(15)
            .required(),
        email: Joi.string()
            .email()
            .lowercase()
            .trim()
            .required(),
        password: Joi.string()
            .max(25)
            .min(7)
            .required()
    })

