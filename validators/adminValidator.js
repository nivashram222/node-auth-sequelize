const { body } = require("express-validator");

exports.createDepartmentValidation = [
    body("name").trim().notEmpty().withMessage("Department name is required")
];

exports.updateDepartmentValidation = [
    body("name").trim().notEmpty().withMessage("Department name is required")
];

exports.createDesignationValidation = [
    body("name").trim().notEmpty().withMessage("Designation name is required")
];

exports.updateDesignationValidation = [
    body("name").trim().notEmpty().withMessage("Designation name is required")
];
