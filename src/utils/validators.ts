import { body, validationResult } from 'express-validator';

export const validateUserRegistration = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateProductCreation = [
  body('name')
    .isString()
    .withMessage('Product name must be a string')
    .isLength({ min: 1 })
    .withMessage('Product name cannot be empty'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),
];

export const validateSaleProcessing = [
  body('productId')
    .isString()
    .withMessage('Product ID must be a string'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),
  body('customerId')
    .isString()
    .withMessage('Customer ID must be a string'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};