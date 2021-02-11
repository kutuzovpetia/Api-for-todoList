const express = require("express");
const path = require("path");
const cors = require('cors');
const sequelize = require("./utils/database");
const todoRoutes = require("./routes/todo.js");
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public'))); /*Путь к папке*/

app.use(express.json());
app.use(cors());
app.use("/api/todo", todoRoutes);

app.use((req, res, next) => {
  // res.sendFile("/index.html");
  res.send("Hi Api!!!");
});

async function start() {
  try {
      await sequelize.sync();
      app.listen(PORT);
  } catch (error) {
      console.log(error);
  }
}

start();


