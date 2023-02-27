const CustomError = require("../utils/customError");
const { m_Employee } = require("../models");
const { encrypt } = require("../utils/encrypt");

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await m_Employee.findAll({
      attributes: ["id", "name", "phone", "role"],
    });
    res.status(200).json({
      status: 200,
      employee,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.newEmployee = async (req, res, next) => {
  try {
    let { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      throw Error("Invalid information");
    }
    phone = phone.trim();
    password = await encrypt(password);
    const employee = await m_Employee.findOne({
      where: {
        phone,
      },
    });
    if (employee) {
      throw Error("You are already registered please login.");
    }
    await m_Employee.create({
      name,
      phone,
      password,
    });
    res.status(200).json({
      status: 200,
      message: "Employee created",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let { id, password } = req.body;
    if (!id || !password) {
      throw Error("Invalid information");
    }

    password = await encrypt(password);
    await m_Employee.update(
      {
        password,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Employee Updated",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
