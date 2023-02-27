const { m_Products, m_Category, Op } = require("../models");
const CustomError = require("../utils/customError");
exports.allProduct = async (req, res, next) => {
  try {
    const products = await m_Products.findAll({
      where: {
        isDeleted: false,
      },
      include: [
        {
          model: m_Category,
          as: "category",
        },
      ],
    });
    res.status(200).json({
      status: 200,
      products,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.newProduct = async (req, res, next) => {
  try {
    let { name, rate, category_id, code, measure, mrp, hsnCode } = req.body;
    if (!name || !rate || !category_id || !code || !measure || !mrp) {
      throw Error("Invalid Info");
    }
    name = name.trim().toUpperCase();
    await m_Products.create({
      name: name.toUpperCase(),
      rate,
      productName: `${name} ${measure}`.toUpperCase(),
      code,
      measure,
      mrp,
      hsnCode,
      category_id,
    });
    res.status(200).json({
      status: 200,
      message: "Product Created",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    let { category_id, id, name, rate, code, measure, mrp, hsnCode } = req.body;
    if (!name || !code || !rate || !category_id || !id) {
      throw Error("Invalid Info");
    }
    name = name.trim().toUpperCase();
    await m_Products.update(
      {
        name: name.toUpperCase(),
        productName: `${name} ${measure}`.toUpperCase(),
        rate,
        code,
        measure,
        mrp,
        hsnCode,
        category_id,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Product Updated",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    let { id } = req.body;
    if (!id) {
      throw Error("Invalid Info");
    }
    await m_Products.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Product Deleted",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    let { name, category_id } = req.body;

    let products = await m_Products.findAll({
      where: {
        isDeleted: false,
        ...(name && { productName: { [Op.like]: `%${name}%`.toUpperCase() } }),
        ...(category_id && { category_id }),
      },
    });
    res.status(200).json({
      status: 200,
      products,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
