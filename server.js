const express = require("express");
const connectDB = require("./src/config/db");
const { authRoutes } = require("./src/routes");
const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
