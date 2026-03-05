const { Department } = require("../models");

exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "Name is required" });
        }

        const department = await Department.create({ name });

        res.json({ msg: "Department created successfully", department });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();

        res.json({ departments });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ msg: "Name is required" });
        }

        const department = await Department.findByPk(req.params.id);

        if (!department) return res.status(404).json({ msg: "Department not found" });

        await department.update({ name });

        res.json({ msg: "Department updated successfully", department });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) return res.status(404).json({ msg: "Department not found" });

        await department.destroy();

        res.json({ msg: "Department deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};
