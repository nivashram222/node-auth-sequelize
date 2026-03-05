const { User, Department, Designation, Role } = require("../models");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, departmentId, designationId, roles } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobile,
            password: hashed,
            departmentId,
            designationId
        });

        if (roles && roles.length > 0) {
            const roleRecords = await Role.findAll({ where: { name: roles } });
            await user.setRoles(roleRecords);
        } else {
            const employeeRole = await Role.findOne({ where: { name: "employee" } });
            if (employeeRole) await user.setRoles([employeeRole]);
        }

        res.json({ msg: "User created successfully", user });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            include: [
                { model: Department, as: "department", attributes: ["id", "name"] },
                { model: Designation, as: "designation", attributes: ["id", "name"] },
                { model: Role, attributes: ["name"] }
            ]
        });

        res.json({ users });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
            include: [
                { model: Department, as: "department", attributes: ["id", "name"] },
                { model: Designation, as: "designation", attributes: ["id", "name"] },
                { model: Role, attributes: ["name"] }
            ]
        });

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ user });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, mobile, departmentId, designationId, roles } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) return res.status(404).json({ msg: "User not found" });

        await user.update({ name, email, mobile, departmentId, designationId });

        if (roles && roles.length > 0) {
            const roleRecords = await Role.findAll({ where: { name: roles } });
            await user.setRoles(roleRecords);
        }

        res.json({ msg: "User updated successfully", user });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) return res.status(404).json({ msg: "User not found" });

        await user.destroy();

        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};
