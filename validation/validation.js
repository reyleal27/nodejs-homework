import Joi from "joi";

const signupValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string().min(6).max(16).required().messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least {#limit} character long",
        "strong.max": "Password cannot be longer than {#limit} characters"
    })
});

const subscriptionValidation = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const contactValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});


const favoriteValidation = Joi.object({
    favorite: Joi.boolean().required(),
})

const emailValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
});


export { signupValidation, contactValidation, favoriteValidation,subscriptionValidation, emailValidation};