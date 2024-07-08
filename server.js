const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const { authRoutes, taskRoutes, teamRoutes } = require("./src/routes");
const { connectDB } = require("./src/config");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinTeam", (teamId) => {
    socket.join(`team_${teamId}`);
  });
  socket.on("leaveTeam", (teamId) => {
    socket.leave(`team_${teamId}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };
