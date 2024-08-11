
const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };
exports.getUserByNumber = async (req, res, next) => {
    try {
      
      const users = await userService.getUserByNumberAndPass(req);
      res.json(users);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };
exports.createUser = async (req, res, next) => {
    try {

      const createdUser = await userService.createUser(req,res);
      console.log(createdUser)
      res.json(createdUser);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };