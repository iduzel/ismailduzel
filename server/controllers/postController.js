const express = require("express");
const app = express();
const Post = require("../models/PostModel");
const Category = require("../models/CategoryModel");
const router = express.Router();
const multer = require("multer");
//const fileUpload = require("express-fileupload");

//app.use(fileUpload());


//CLOUDINARY

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Store",
    format: async (req, file) => {
      let extension = "";

      if (file.mimetype.includes("image")) {
        extension = file.mimetype.slice(6);

        if (extension === "jpeg") extension = "jpg";
      }

      return extension;
    },
    public_id: (req, file) =>
      `${req.body._id}-${Date.now()}-${file.originalname}`,
  },
});

const uploadCloudinary = multer({ storage: storageCloudinary });

/* //upload

const Storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./store/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: Storage }); */

// list
router.get("/list", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "owner", select: "username image" })
      .sort({ $natural: -1 });
    res.send({ success: true, posts });
  } catch (error) {
    console.log("posts listing error", error.message);
    res.send(error.message);
  }
});

// add
router.post("/addpost", uploadCloudinary.single("image"), async (req, res) => {
  try {
    console.log("PostController/post req body is: ", req.body);
    console.log("posts/add file", req.file);

    if (req.file) req.body.image = req.file.path;

    const newPost = new Post(req.body);
    const post = await newPost
      .save()
      .then((item) =>
        item.populate({ path: "owner", select: "username image" })
      );

    console.log("post: ", post);

    if (!post) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, post });
  } catch (error) {
    console.log("Post Error: ", error.message);
    res.send(error.message);
  }
});

/* // add
router.post("/addpost", upload.single("image"), async (req, res) => {
  try {
    console.log("PostController/post req body is: ", req.body);
    console.log("posts/add file", req.file);

    if (req.file) req.body.image = req.file.filename;

    const newPost = new Post(req.body);
    const post = await newPost
      .save()
      .then((item) =>
        item.populate({ path: "owner", select: "username image" })
      );

    console.log("post: ", post);

    if (!post) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, post });
  } catch (error) {
    console.log("Post Error: ", error.message);
    res.send(error.message);
  }
}); */

module.exports = router;
