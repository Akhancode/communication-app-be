// const UserModel = require('../models/userModel');

const userModel = require("../models/user.model");
const { createIndexes } = require("../utils/mongoHelper/mongoHelper");

exports.getAllUsers = async () => {
  try {
    return await userModel.find();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
exports.getUserByNumberAndPass = async (req) => {
  try {
    const {mobileNumber,password} = req.body
    return await userModel.findOne({mobileNumber,password});
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
exports.createUser = async (req,res) => {
  try {
    const { userName, mobileNumber,countryCode,password } = req.body;
    console.log(req.body)
    const user = new userModel({
      mobileNumber,
      password,
      userName
    });
    return await user.save();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};
