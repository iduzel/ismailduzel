const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: Boolean,
  emailVerificationToken: String,
  password: {
    type: String,
    required: true,
  },
  age: { type: Number },
  address: { type: String },
  image: { type: String },
  token: { type: String }, // access token
  resetToken: String, // password change
  phone: { type: Number },
  birthDate: { type: String },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async (providedPass, dbPass) => {
  console.log("compare pass method: passwords are", providedPass, dbPass);

  return await bcrypt.compare(providedPass, dbPass);
};

userSchema.methods.generateToken = async function (expiration, dbField) {
  const user = this;

  const token = jwt.sign({id: user._id.toHexString()}, process.env.SECRET, {
    expiresIn: expiration,
  });

  if (dbField) {
    user[dbField] = token;
    await user.save();
    return user;
  } else {

    return token
  }
};

userSchema.statics.getPayload = async token => {

  try {
     return jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return error.message
  }

 
}


module.exports = mongoose.model("User", userSchema);
