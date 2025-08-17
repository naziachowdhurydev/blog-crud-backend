const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const createBnnerroute = require("./routes/createBannerRoute");
const createBannerRoute = require("./routes/createBannerRoute");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bannerModel = require("./model/bannerModel");

const app = express();
const port = 3000;
app.use(cors());
app.use("/uploads", express.static("uploads"));
const jsonParser = bodyParser.json();
app.use(express.json());

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// app.use("/banner-post", jsonParser, createBnnerroute);

app.post(
  "/banner-post",
  jsonParser,
  upload.single("image"),
  async (req, res) => {
    // console.log(req.body, "nazia", req.file);

    console.log(req.file.filename);
    const imagename = req.file.filename;
    try {
      const { title, subtitle, description } = req.body;
      const image = req.file;
      const imageData = fs.readFileSync(req.file.path);
      // console.log(imagename);

      const bannerData = bannerModel({
        title,
        subtitle,
        description,
        date: new Date(),
        imageName: imagename,
        image: {
          data: imageData,
          contentType: image.mimetype,
        },
      });
      await bannerData.save();
      console.log(image, "body:", title, subtitle, description);
      res.status(201).json({
        message: "Banner uploaded successfully",
        data: req.file.path,
        banner: bannerData,
      });
      // res.send(req.file);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to upload banner" });
    }
  }
);

app.use("/banner-get", createBnnerroute);

app.use("/banner-update", jsonParser, createBnnerroute);

app.use("/banner-delete/", createBannerRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
