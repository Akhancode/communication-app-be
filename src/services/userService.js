// const UserModel = require('../models/userModel');

exports.getAllUsers = async () => {
  try {
    throw "this"
    return "user"
    return await UserModel.find();
  } catch (error) {
    throw new Error(error); // Customize error message
  }
};