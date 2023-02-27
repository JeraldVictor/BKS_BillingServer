const CustomError = require("../utils/customError");
const { m_OrderItems, m_Orders } = require("../models");

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await m_Orders.findAll({
      include: {
        model: m_OrderItems,
        as: "Items",
      },
      order: [["placed_on", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      orders,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

exports.newOrder = async (req, res, next) => {
  try {
    let {
      billType,
      total,
      discount,
      rate,
      status,
      Items,
      message,
      mrp,
      billedBy,
    } = req.body;
    let order = await m_Orders.create(
      {
        billType,
        total,
        discount,
        rate,
        status,
        Items,
        message,
        mrp,
        billedBy,
      },
      {
        include: {
          model: m_OrderItems,
          as: "Items",
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Order Placed",
      order,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(error.message, 500));
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    let { billType, status, id } = req.body;
    if (!id) {
      throw Error("Invalid Info");
    }
    await m_Orders.update(
      {
        billType,
        status,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Order Updated",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.deleteOrder = async (req, res, next) => {
  try {
    let { id } = req.body;
    if (!id) {
      throw Error("Invalid Info");
    }
    await m_OrderItems.destroy({
      where: {
        order_id: id,
      },
    });
    await m_Orders.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Order Deleted",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
