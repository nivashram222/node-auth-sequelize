const { body } = require("express-validator");

exports.createUserValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("mobile").optional().isMobilePhone().withMessage("Valid mobile number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("departmentId").optional().isInt().withMessage("Department ID must be a number"),
    body("designationId").optional().isInt().withMessage("Designation ID must be a number"),
    body("roles").optional().isArray().withMessage("Roles must be an array")
];

exports.updateUserValidation = [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
    body("mobile").optional().isMobilePhone().withMessage("Valid mobile number is required"),
    body("departmentId").optional().isInt().withMessage("Department ID must be a number"),
    body("designationId").optional().isInt().withMessage("Designation ID must be a number"),
    body("roles").optional().isArray().withMessage("Roles must be an array")
];
