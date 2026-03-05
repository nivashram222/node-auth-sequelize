const { Team, User, Company, Role } = require("../models");
const bcrypt = require("bcryptjs");

// Create team (super-admin only)
exports.createTeam = async (req, res) => {
    try {
        const { name, companyId } = req.body;

        const team = await Team.create({ name, companyId });

        res.json({ msg: "Team created successfully", team });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [
                { model: Company, as: "company", attributes: ["id", "name"] },
                { model: User, as: "members", attributes: ["id", "name", "email"] }
            ]
        });

        res.json({ teams });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create subordinate user (Manager creates Team Lead, Team Lead creates Developer)
exports.createSubordinate = async (req, res) => {
    try {
        const { name, email, mobile, password, role, teamId } = req.body;

        const manager = await User.findByPk(req.user.id, {
            include: [{ model: Role, attributes: ["name"] }]
        });

        const managerRoles = manager.Roles.map(r => r.name);

        // Validation: Manager can only create Team Lead
        if (managerRoles.includes("manager") && role !== "team-lead") {
            return res.status(403).json({ msg: "Manager can only create Team Lead" });
        }

        // Validation: Team Lead can only create Developer
        if (managerRoles.includes("team-lead") && role !== "developer") {
            return res.status(403).json({ msg: "Team Lead can only create Developer" });
        }

        // Validation: Developer cannot create subordinates
        if (managerRoles.includes("developer")) {
            return res.status(403).json({ msg: "Developer cannot create subordinates" });
        }

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ msg: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobile,
            password: hashed,
            managerId: req.user.id,
            teamId
        });

        const roleRecord = await Role.findOne({ where: { name: role } });
        if (roleRecord) await user.setRoles([roleRecord]);

        res.json({ msg: "Subordinate created successfully", user });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get my subordinates
exports.getMySubordinates = async (req, res) => {
    try {
        const subordinates = await User.findAll({
            where: { managerId: req.user.id },
            attributes: { exclude: ["password"] },
            include: [
                { model: Role, attributes: ["name"] },
                { model: Team, as: "team", attributes: ["id", "name"] }
            ]
        });

        res.json({ subordinates });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get team hierarchy
exports.getTeamHierarchy = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "members",
                    attributes: { exclude: ["password"] },
                    include: [
                        { model: Role, attributes: ["name"] },
                        { model: User, as: "manager", attributes: ["id", "name"] },
                        { model: User, as: "subordinates", attributes: ["id", "name"] }
                    ]
                }
            ]
        });

        if (!team) return res.status(404).json({ msg: "Team not found" });

        res.json({ team });
    } catch (err) {
        res.status(500).json(err);
    }
};
