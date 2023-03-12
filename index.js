// Dependency
const express = require("express");
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.BASE_URL;

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/note", notes);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile;
  path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    };
});

app.listen(PORT, () => {
  console.log("I am listing at port 8080");
});

// mongodb connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://PrinceAshish:PrinceAshish0088@cluster0.vjxkusa.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});
