const router = require("express").Router();
const companyController = require("../controllers/company.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

// All routes require super-admin role
router.post("/", authMiddleware, checkRole("super-admin"), companyController.createCompany);
router.get("/", authMiddleware, checkRole("super-admin"), companyController.getAllCompanies);
router.get("/:id", authMiddleware, checkRole("super-admin"), companyController.getCompanyById);
router.put("/:id", authMiddleware, checkRole("super-admin"), companyController.updateCompany);
router.delete("/:id", authMiddleware, checkRole("super-admin"), companyController.deleteCompany);

module.exports = router;

