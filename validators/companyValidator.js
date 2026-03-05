const { body } = require("express-validator");

exports.createCompanyValidation = [
    body("name").trim().notEmpty().withMessage("Company name is required"),
    body("userId").isInt().withMessage("User ID is required and must be a number")
];

exports.updateCompanyValidation = [
    body("name").optional().trim().notEmpty().withMessage("Company name cannot be empty"),
    body("userId").optional().isInt().withMessage("User ID must be a number")
];
