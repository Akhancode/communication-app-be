// const UserModel = require('../models/userModel');

const userModel = require("../models/user.model");
const { createIndexes } = require("../utils/mongoHelper/mongoHelper");

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
    const { userName, mobileNumber,countryCode } = req.body;
   
    const user = new userModel({
      userName,
      mobileNumber,
      countryCode
    });
    return await user.save();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
