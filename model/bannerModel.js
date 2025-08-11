const mongoose = require("mongoose");
const { Schema } = mongoose;

const createBanner = Schema({
  title: String,
  subtitle: String,
  description: String,
  date: Date,
});

const bannerModel = mongoose.model("banner-data", createBanner);

module.exports = bannerModel;
