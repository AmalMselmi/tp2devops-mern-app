const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is running");
});

const dbo = require("./db/conn");

dbo
  .connectToMongoDB()
  .then(() => {
    app.use(require("./routes/record"));
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });