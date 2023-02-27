const { m_Employee } = require("../models");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

exports.userLogin = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    // const token = req.headers["auth"];
    // if (!token) {
    //   throw Error("Please Login");
    // }

    // const userToken = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await m_Employee.findOne({
    //   where: {
    //     id: userToken.id,
    //   },
    // });
    // if (!req.user) {
    //   throw Error("Please Login");
    // }
    next();
  } catch (error) {
    return next(new CustomError(error.message, 400));
  }
};

exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError("You are not allowed for this resource", 403)
      );
    }
    next();
  };
};
