require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const SocketServer = require("./socketServer");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = [];
io.on("connection", (socket) => {
  console.log(socket.id + "Connected!");
  SocketServer(socket);
});

//Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRoutes"));
app.use("/api", require("./routes/commentRoutes"));
app.use("/api", require("./routes/notifyRoutes"));
app.use("/api", require("./routes/messageRouter"));

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongo DB Error in connection: " + err);
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 6000;
http.listen(port, () => {
  console.log("Server is running in port:" + port);
});