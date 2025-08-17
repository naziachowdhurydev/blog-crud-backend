const mongoose = require("mongoose");
const { Schema } = mongoose;

const createBanner = Schema({
  title: String,
  subtitle: String,
  description: String,
  date: Date,
  imageName: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const bannerModel = mongoose.model("banner-data", createBanner);

module.exports = bannerModel;
