const userService = require("../services/userService");

exports.getUsers = async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };