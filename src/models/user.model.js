const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    userName: {
      required: false,
      type: String,
    },
    mobileNumber: {
      required: false,
      type: String,
      unique: true,
    },
    active: {
      required: false,
      type: Boolean,
      default: true
    },

  },
  {
    timestamps: true,
  }
);

userSchema.set("collection", "user");
module.exports = mongoose.model("user", userSchema);
