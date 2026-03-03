const checkRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      const { User, Role } = require("../models");
      const user = await User.findByPk(req.user.id, {
        include: [{ model: Role, attributes: ["name"] }]
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const userRoles = user.Roles.map(role => role.name);
      const hasRole = allowedRoles.some(role => userRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.userRoles = userRoles;
      next();
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  };
};

module.exports = checkRole;
