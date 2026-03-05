const { Designation } = require("../models");

exports.createDesignation = async (req, res) => {
    try {
        const { name } = req.body;

        const designation = await Designation.create({ name });

        res.json({ msg: "Designation created successfully", designation });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAll();

        res.json({ designations });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateDesignation = async (req, res) => {
    try {
        const { name } = req.body;
        const designation = await Designation.findByPk(req.params.id);

        if (!designation) return res.status(404).json({ msg: "Designation not found" });

        await designation.update({ name });

        res.json({ msg: "Designation updated successfully", designation });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);

        if (!designation) return res.status(404).json({ msg: "Designation not found" });

        await designation.destroy();

        res.json({ msg: "Designation deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};
