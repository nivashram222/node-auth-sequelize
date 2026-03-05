const router = require("express").Router();
const userController = require("../controllers/user.controller");
const departmentController = require("../controllers/department.controller");
const designationController = require("../controllers/designation.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { createUserValidation, updateUserValidation } = require("../validators/userValidator");
const { createDepartmentValidation, updateDepartmentValidation, createDesignationValidation, updateDesignationValidation } = require("../validators/adminValidator");

// User management - super-admin only
router.post("/users", authMiddleware, checkRole("super-admin"), createUserValidation, validate, userController.createUser);
router.get("/users", authMiddleware, checkRole("super-admin"), userController.getAllUsers);
router.get("/users/:id", authMiddleware, checkRole("super-admin"), userController.getUserById);
router.put("/users/:id", authMiddleware, checkRole("super-admin"), updateUserValidation, validate, userController.updateUser);
router.delete("/users/:id", authMiddleware, checkRole("super-admin"), userController.deleteUser);

// Department management - super-admin only
router.post("/departments", authMiddleware, checkRole("super-admin"), createDepartmentValidation, validate, departmentController.createDepartment);
router.get("/departments", authMiddleware, checkRole("super-admin"), departmentController.getAllDepartments);
router.put("/departments/:id", authMiddleware, checkRole("super-admin"), updateDepartmentValidation, validate, departmentController.updateDepartment);
router.delete("/departments/:id", authMiddleware, checkRole("super-admin"), departmentController.deleteDepartment);

// Designation management - super-admin only
router.post("/designations", authMiddleware, checkRole("super-admin"), createDesignationValidation, validate, designationController.createDesignation);
router.get("/designations", authMiddleware, checkRole("super-admin"), designationController.getAllDesignations);
router.put("/designations/:id", authMiddleware, checkRole("super-admin"), updateDesignationValidation, validate, designationController.updateDesignation);
router.delete("/designations/:id", authMiddleware, checkRole("super-admin"), designationController.deleteDesignation);

module.exports = router;
