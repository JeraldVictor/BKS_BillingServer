const CustomError = require("../utils/customError");
const { m_OrderItems, m_Orders } = require("../models");

const updateOrder = async (order_id) => {
  let items = await m_OrderItems.findAll({
    where: {
      order_id,
    },
  });

  let total = 0;
  items.forEach((item) => {
    total = Number(total) + Number(item.rate);
  });
  let order = await m_Orders.findOne({
    where: {
      id: order_id,
    },
  });

  await m_Orders.update(
    {
      total,
      rate: Number(total) - Number(order.discount),
    },
    {
      where: {
        id: order_id,
      },
    }
  );
};

exports.newOrderItem = async (req, res, next) => {
  try {
    let { order_id, name, mrp, rate, qty, total } = req.body;
    if (!order_id) {
      throw Error("Invalid Info");
    }

    await m_OrderItems.create({
      name: name.toUpperCase(),
      mrp,
      rate,
      qty,
      total,
      order_id,
    });

    await updateOrder(order_id);

    res.status(200).json({
      status: 200,
      message: "Order Item added",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    let { id, order_id } = req.body;

    await m_OrderItems.destroy({
      where: {
        id,
      },
    });

    await updateOrder(order_id);
    res.status(200).json({
      status: 200,
      message: "Order Item deleted",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
