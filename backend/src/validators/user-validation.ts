import Joi from "joi";

export const registerValidate = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 30 characters long.",
    "any.required": "Username is required.",
  }),

  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  }),

  role: Joi.string().required().messages({
    "string.base": "Role must be a string.",
    "string.empty": "Role cannot be empty.",
    "any.required": "Role is required.",
  }),
});

export const loginValidate = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username cannot be empty.",
    "any.required": "Username is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
  }),
});
