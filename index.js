const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const createBnnerroute = require("./routes/createBannerRoute");
const createBannerRoute = require("./routes/createBannerRoute");

const app = express();
const port = 3000;
app.use(cors());
const jsonParser = bodyParser.json();

require("dotenv").config();

const DB = process.env.LOCAL_DB;

async function connectDB() {
  try {
    await mongoose.connect(DB);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
}
connectDB();

app.use("/banner-post", jsonParser, createBnnerroute);

app.use("/banner-get", createBnnerroute);

app.use("/banner-update", jsonParser, createBnnerroute);

app.use("/banner-delete/", createBannerRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
