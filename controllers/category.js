const CustomError = require("../utils/customError");
const { m_Category, m_Products } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const category = await m_Category.findAll({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({
      status: 200,
      category,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const category = await m_Category.findAll({
      include: {
        model: m_Products,
        as: "products",
        required: false,
        where: {
          isDeleted: false,
        },
      },
    });
    res.status(200).json({
      status: 200,
      category,
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.newCategory = async (req, res, next) => {
  try {
    let { name } = req.body;
    name = name.trim().toUpperCase();
    if (!name) {
      throw Error("Invalid Category");
    }
    const category = await m_Category.findOne({
      where: { name, isDeleted: false },
    });
    if (category) {
      throw Error("Category already exists");
    }
    await m_Category.create({
      name,
    });
    res.status(200).json({
      status: 200,
      message: "Category Created",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    let { name, id, isDeleted } = req.body;
    if (!name || !id) {
      throw Error("Invalid Category");
    }
    name = name.trim().toUpperCase();
    await m_Category.update(
      { name, isDeleted },
      {
        where: { id },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Category Updated",
    });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    let { id } = req.body;
    if (!id) {
      throw Error("Invalid Category");
    }

    let count = await m_Category.count({
      include: {
        model: m_Products,
        as: "products",
        required: true,
        where: {
          isDeleted: false,
        },
      },
    });
    if (count >= 1) {
      throw Error("Unable to delete. Category has products under it.");
    }
    await m_Category.update(
      { isDeleted: true },
      {
        where: { id },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Category Deleted",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(error.message, 500));
  }
};
