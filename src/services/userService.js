// const UserModel = require('../models/userModel');

const userModel = require("../models/user.model");

exports.getAllUsers = async () => {
  try {
    throw "this";
    return "user";
    return await UserModel.find();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
exports.createUser = async (req,res) => {
  try {
    const { userName, mobileNumber } = req.body;
    const user = new userModel({
      userName,
      mobileNumber,
    });
    return await user.save();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
