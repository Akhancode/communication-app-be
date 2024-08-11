const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      required: false,
      type: String,
    },
    mobileNumber: {
      required: true,
      type: Number,
    },
    countryCode: {
      required: false,
      type: Number,
      default:'91'
    },
    password: {
      required: true,
      type: String,
    },
    active: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ countryCode: 1, mobileNumber: 1 }, { unique: true });
userSchema.set("collection", "user");
module.exports = mongoose.model("user", userSchema);
