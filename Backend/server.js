import app from "./app.js";
import cloudinary from "cloudinary";
//import cors from "cors";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port${process.env.PORT}`);
});

//const express = require("express");
//const cors = require("cors");
//const app = express();
/*
app.use(cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
