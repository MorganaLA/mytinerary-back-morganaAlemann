import Joi from 'joi';

export const userSignSchema = Joi.object({
    email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2
    })
    .messages({
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .min(8)
    .max(35)
    .alphanum(),
});


export const signUpSchema = userSignSchema.keys({
  first_name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
    .message('The first name must contain only alphabetical characters'),

  last_name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
    .message('The last name must contain only alphabetical characters'),

  photo: Joi.string()
    .required()
    .uri(),

  country: Joi.string()
    .required()
    .min(2)
    .max(50),
});

export const signInSchema = userSignSchema;
