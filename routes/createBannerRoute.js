const express = require("express");
const bannerModel = require("../model/bannerModel");
const createBannerRoute = express.Router();
const path = require("path");
const fs = require("fs");

const uploadDiri = path.join(__dirname, "../uploads");

createBannerRoute.get("/", async (req, res) => {
  try {
    const itmes = await bannerModel.find();
    // console.log(itmes)
    const data = itmes.map((item) => ({
      id: item._id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      imageName: item.imageName,
      image: {
        data: `data:${item.image.contentType};base64,${item.image.data.toString(
          "base64"
        )}`,
      },
    }));
    // console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

createBannerRoute.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await bannerModel.findByIdAndUpdate(id, data, { new: true });

    console.log("api hit data", req.body, "params id:", req.params.id);
    res.send(req.body, req.params);
  } catch (error) {
    console.log(error);
  }
});

createBannerRoute.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body.imageName);

  const filename = req.body.imageName;
  const imagePath = path.join(uploadDiri, filename);

  try {
    const id = req.params.id;
    await bannerModel.findByIdAndDelete(id);
    fs.unlink(imagePath, (err) => console.log(err));
    res.send(`Id deleted Successfully ${id}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = createBannerRoute;
