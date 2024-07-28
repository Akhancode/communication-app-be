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
      required: true,
      type: Number,
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
