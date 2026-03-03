const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendLoginMail } = require("../services/mailService");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        if (roles && roles.length > 0) {
            const roleRecords = await Role.findAll({ where: { name: roles } });
            await user.setRoles(roleRecords);
        } else {
            const employeeRole = await Role.findOne({ where: { name: "employee" } });
            if (employeeRole) await user.setRoles([employeeRole]);
        }

        res.json({ msg: "Registered successfully", user });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email },
            include: [{ model: Role, attributes: ["name"] }]
        });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid credentials" });

        const roles = user.Roles.map(role => role.name);

        const token = jwt.sign(
            { id: user.id, email: user.email, roles },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        sendLoginMail(user.email, user.name)
            .catch(err => console.log("Mail error:", err));

        res.json({ msg: "Login success", token, roles });

    } catch (err) {
        res.status(500).json(err);
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid password" });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ msg: "Password changed successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.logout = async (req, res) => {
    try {
        res.json({ msg: "Logout successful" });
    } catch (err) {
        res.status(500).json(err);
    }
};

