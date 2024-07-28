const { createIndexes } = require("../utils/mongoHelper/mongoHelper");

module.exports = async (req, res, next) => {
  try {
     await createIndexes();
    next();
  } catch (error) {
    console.log(error);
    console.log("error______");
  }
};
