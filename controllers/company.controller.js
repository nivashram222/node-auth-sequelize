const { Company, User } = require("../models");

exports.createCompany = async (req, res) => {
    try {
        const { name, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const company = await Company.create({ name, userId });

        res.json({ msg: "Company created successfully", company });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
        });

        res.json({ companies });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
        });

        if (!company) return res.status(404).json({ msg: "Company not found" });

        res.json({ company });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const company = await Company.findByPk(req.params.id);

        if (!company) return res.status(404).json({ msg: "Company not found" });

        if (userId) {
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json({ msg: "User not found" });
        }

        await company.update({ name, userId });

        res.json({ msg: "Company updated successfully", company });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);

        if (!company) return res.status(404).json({ msg: "Company not found" });

        await company.destroy();

        res.json({ msg: "Company deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};
