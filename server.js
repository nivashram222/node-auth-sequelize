require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// load models (important for associations later)
require("./models/user");

const authRoutes = require("./routes/user.js");
const companyRoutes = require("./routes/company.js");
const adminRoutes = require("./routes/admin.js");
const teamRoutes = require("./routes/team.js");

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teams", teamRoutes);

/*
|--------------------------------------------------------------------------
| Health Check Route (optional but useful)
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

/*
|--------------------------------------------------------------------------
| Database Connection + Server Start
|--------------------------------------------------------------------------
*/
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Connected");

        // ❗ NO sequelize.sync() because migrations are used

        app.listen(5000, () =>
            console.log("🚀 Server running on port 5000")
        );

    } catch (error) {
        console.error("❌ DB connection error:", error);
    }
};

startServer();
