import Joi from "joi";

export const registerUserSchema = Joi.object({
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

  roles: Joi.array().items(Joi.string().valid("admin", "manager", "employee")).required().messages({
    "array.base": "Roles must be an array.",
    "array.empty": "Roles cannot be empty.",
    "any.required": "Roles are required.",
    "string.base": "Each role must be a string.",
    "any.only": "Each role must be one of Teacher, Student, or Institute."
  }),
});
