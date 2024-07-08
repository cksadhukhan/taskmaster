const express = require("express");
const connectDB = require("./src/config/db");
const { authRoutes, taskRoutes } = require("./src/routes");
const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
