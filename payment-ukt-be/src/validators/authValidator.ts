import { body } from "express-validator";

export const authValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long")
  ]
}