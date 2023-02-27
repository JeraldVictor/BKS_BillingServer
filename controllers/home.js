const CustomError = require("../utils/customError");
const { m_Employee } = require("../models");
const { encrypt } = require("../utils/encrypt");
const { userLogin } = require("../middleware/auth");

exports.home = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Welcome Home",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

exports.login = async (req, res, next) => {
  // INSERT INTO `Employees` (`id`, `name`, `password`, `phone`, `blocked`, `blockedReason`, `role`, `session`, `registered_on`) VALUES (NULL, 'Jerald', '850922b1c0564a4186bc19b1b45a34fd80b3469256501dd44c1f14dfae08e9460cce972917ddb58605ad62350af64fa4db24004a9d1a85f9a6f463976d87c3aa', '9003372008', '0', NULL, 'admin', NULL, '2022-10-30 17:52:19.000000');
  try {
    let { phone, password } = req.body;
    if (!phone || !password) {
      throw Error("Invalid Login Info");
    }
    password = await encrypt(password);
    const employee = await m_Employee.findOne({
      attributes: ["id", "name", "phone", "role"],
      where: {
        phone: phone.trim(),
        password,
        blocked: false,
      },
    });
    if (!employee) {
      throw Error("Invalid ID or Password");
    }
    let key = await userLogin(employee.id);
    await m_Employee.update(
      {
        session: key,
      },
      {
        where: {
          phone: phone.trim(),
        },
      }
    );
    res.status(200).json({
      status: 200,
      employee,
      session: key,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
