const userService = require("../services/userService");

exports.callInitiate = async (req, res, next) => {
    try {
      res.send("call initiated . ")
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  };
