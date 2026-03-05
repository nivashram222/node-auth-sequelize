const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");
const { registerValidation, loginValidation, changePasswordValidation } = require("../validators/authValidator");

// public
router.post("/register", registerValidation, validate, auth.register);
router.post("/login", loginValidation, validate, auth.login);
router.post("/change-password", authMiddleware, changePasswordValidation, validate, auth.changePassword);
router.post('/logout', authMiddleware, auth.logout);

// protected
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        msg: "Protected route accessed",
        user: req.user
    });
});

// role-based routes
router.get("/admin", authMiddleware, checkRole("admin", "super-admin"), (req, res) => {
    res.json({ msg: "Admin access granted", roles: req.userRoles });
});

router.get("/super-admin", authMiddleware, checkRole("super-admin"), (req, res) => {
    res.json({ msg: "Super admin access granted", roles: req.userRoles });
});

module.exports = router;
