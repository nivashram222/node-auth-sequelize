const router = require("express").Router();
const teamController = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { createTeamValidation, createSubordinateValidation } = require("../validators/teamValidator");

// Team management - super-admin only
router.post("/", authMiddleware, checkRole("super-admin"), createTeamValidation, validate, teamController.createTeam);
router.get("/", authMiddleware, checkRole("super-admin", "admin"), teamController.getAllTeams);
router.get("/:id/hierarchy", authMiddleware, teamController.getTeamHierarchy);

// Hierarchical user creation - Manager and Team Lead
router.post("/subordinates", authMiddleware, checkRole("manager", "team-lead"), createSubordinateValidation, validate, teamController.createSubordinate);
router.get("/my-subordinates", authMiddleware, checkRole("manager", "team-lead"), teamController.getMySubordinates);

module.exports = router;
