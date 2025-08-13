const express = require("express");
const bannerModel = require("../model/bannerModel");
const createBannerRoute = express.Router();

createBannerRoute.post("/", async (req, res) => {
  try {
    // const data = {
    //   title: req.body.title,
    //   subtitle: req.body.subtitle,
    //   description: req.body.description,
    //   date: new Date(),
    // };
    // const bannerData = bannerModel(data);

    // await bannerData.save();

    res.status(201).json({ success: true, message: "Item created succefully" });
  } catch (error) {
    console.log(error);
  }
});

createBannerRoute.get("/", async (req, res) => {
  try {
    const itmes = await bannerModel.find();
    // console.log(itmes)
    const data = itmes.map((item) => ({
      id: item._id,
      title: item.title,
      suntitle: item.subtitle,
      description: item.description,
      image: {
        data: `data:${item.image.contentType};base64,${item.image.data.toString(
          "base64"
        )}`,
      },
    }));

    console.log(data, "from data");
    // const dataBanner = itmes.map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   subtitle: item.subtitle,
    //   description: item.description,
    //   date: item.data,
    //   image: {
    //     data: `data:${item.image.contentType};base64,${item.image.data.toString(
    //       "base64"
    //     )}`,
    //   },
    // }));

    // console.log("dataBanner", dataBanner);
    res.json(dataBanner);
    res.send(dataBanner);
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
  try {
    const id = req.params.id;
    await bannerModel.findByIdAndDelete(id);
    res.send(`Id deleted Successfully ${id}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = createBannerRoute;
