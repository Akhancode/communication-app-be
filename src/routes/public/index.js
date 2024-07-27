const express = require("express");
const router = express();

// import user or public routes here
// const test = require("./test.route");
const userRoute = require("./user");

router.use("/public",userRoute);

module.exports = router;