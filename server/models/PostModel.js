const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  likes: {
    type: [],
  },
  comments: [
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
      },
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
