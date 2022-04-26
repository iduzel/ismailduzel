const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/users/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email;

      // check if there is such a user in db
      const user = await User.findOne({ email });

      // if there is such user then return it
      if (user) return done(null, user);

      // create a new user to insert to the db
      const newUser = new User({
        username: profile.id,
        email,
        password: email,
      });

      const savedUser = await newUser.save();

      return done(null, savedUser);
    }
  )
);

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

router.get("/", (req, res) => {
  res.send("HELLO FROM CONTROLLER");
  console.log("User: ", User);
});

//EMAIL
const sendEmail = require("../utils/mail/mail");
const sendEmailResetPass = require("../utils/mail/mailResetPass");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("userController/register req body is: ", req.body);

    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.send({ success: false, errorId: 1 });

    const newUser = new User(req.body);
    console.log("newUser: ", newUser);
    const user = await newUser.save();

    //token
    const token = await user.generateToken("1d");

    // send an email to the user that just registred
    sendEmail(user.email, token);
    console.log("user: ", user);

    res.send({ success: true, user });
  } catch (error) {
    console.log("Register Error: ", error.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("login req.body: ", req.body);

    // get user from client side
    const { username, email, password } = req.body;
    if (!(email || username) || !password)
      return res.send({ success: false, errorId: 1 });

    // find user in db
    let user = await User.findOne({
      $or: [{ email }, { username }],
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user)
      return res.send({ success: false }, console.log("user not found"));

    // compare userClient pass and userServer pass
    const passMatch = await user.comparePassword(password, user.password);
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 });

    const token = await user.generateToken("1d");

    user = user.toObject();
    delete user.pass;
    delete user.token;

    res.cookie("cookieStore", token).send({ success: true, user });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.send(error.message);
  }
});

// LOGOUT
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("cookieStore").send({ success: true });
    console.log("logout: user logged out");
  } catch (error) {
    console.log("Logout ERROR:", error.message);
    res.send(error.message);
  }
});

router.patch("/profile", uploadCloudinary.single("image"), async (req, res) => {
  try {
    console.log("req.body is", req.body);
    console.log("req.file is", req.file);

    const { email, username, _id } = req.body;

    if (!(email || username)) return res.send({ success: false, errorId: 1 });

    // req.body.image = req.file.filename
    if (req.file) req.body.image = req.file.path;

    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-__v -pass");

    console.log("Profile: user is", user);

    if (!user) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, user });
  } catch (error) {
    console.log("Register ERROR:", error.message);
    res.send(error.message);
  }
});

router.patch(
  "/profilecloudinary",
  uploadCloudinary.single("image"),
  async (req, res) => {
    try {
      console.log("req.body CLOUDINARY is", req.body);
      console.log("req.file CLOUDINARY is", req.file);

      const { email, username, _id } = req.body;

      if (!(email || username)) return res.send({ success: false, errorId: 1 });

      // const foundUser = await User.findById({_id})
      //
      // update users (field1, field2) set field1 = email and field2 = username

      req.body.image = req.file.path;

      const user = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
      }).select("-__v -pass");

      console.log("Profile: user CLOUDINARY is", user);

      if (!user) return res.send({ success: false, errorId: 2 });

      res.send({ success: true, user });
    } catch (error) {
      console.log("Register CLOUDINARY ERROR:", error.message);
      res.send(error.message);
    }
  }
);

// EMAIL CONFIRM
router.get("/emailconfirm/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log("token is:", token);

    // find the user with provided id (id is contained inside JWT)
    // update the user and set emailverified to true

    const payload = await User.getPayload(token);
    const id = payload.id;

    const updatedUser = User.findByIdAndUpdate(id, { emailVerified: true });

    if (!updatedUser) return res.send();

    res.send({ success: true });
  } catch (error) {
    console.log("Email Confirm ERROR:", error.message);
    res.send(error.message);
  }
});

//forgot pass
router.post("/forgotpass", async (req, res) => {
  try {
    const email = req.body.email;
    console.log("email is", email);

    // find user in db
    const user = await User.findOne({ email: email });
    console.log("user is", user);

    if (!user) return send({ success: false, errorId: 1 });

    const userWithToken = await user.generateToken("1d", "resetToken");

    console.log("token is ", userWithToken.resetToken);

    if (!userWithToken.resetToken) return send({ success: false, errorId: 2 });

    sendEmailResetPass(user.email, userWithToken.resetToken);

    res.send({ success: true });
  } catch (error) {
    console.log("forgot pass ERROR:", error.message);
    res.send(error.message);
  }
});

//change pass
router.post("/changepass", async (req, res) => {
  try {
    const { pass, token } = req.body;

    console.log("body is", req.body);

    // 1. verify the token
    const verifiedToken = await User.getPayload(token);

    console.log("verified token is", verifiedToken);

    const user = await User.findByIdAndUpdate(verifiedToken.id);

    if (user) {
      user.password = pass;
      user.resetToken = "";

      const userSaved = await user.save();
      console.log("user is ", userSaved);
    }

    res.send({ success: true });
  } catch (error) {
    console.log("change pass ERROR:", error.message);
    res.send(error.message);
  }
});

// GOOGLE LOGIN PATHS

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/google/failure",
    session: false,
  }),
  async (req, res) => {
    console.log("from google callback: id is", req.user._id);

    // User is the class. req.user is a new User
    const token = await req.user.generateToken("1d");

    res.cookie("cookieStore", token);

    res.redirect("http://localhost:3000/glogin/" + req.user._id);
  }
);

router.get("/glogin/:id", async (req, res) => {
  console.log("from glogin: id is", req.params.id);

  const user = await User.findById(req.params.id).select("-__v -pass");

  res.send({ success: true, user });
});
module.exports = router;
