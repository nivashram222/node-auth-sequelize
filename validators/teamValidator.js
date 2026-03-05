const { body } = require("express-validator");

exports.createTeamValidation = [
    body("name").trim().notEmpty().withMessage("Team name is required"),
    body("companyId").isInt().withMessage("Company ID is required and must be a number")
];

exports.createSubordinateValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("mobile").optional().isMobilePhone().withMessage("Valid mobile number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["team-lead", "developer"]).withMessage("Role must be team-lead or developer"),
    body("teamId").isInt().withMessage("Team ID is required and must be a number")
];
