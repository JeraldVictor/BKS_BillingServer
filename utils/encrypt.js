const crypto = require("crypto");

exports.encrypt = async (password) => {
  try {
    return await crypto
      .pbkdf2Sync(password, "salt", 10, 64, "sha512")
      .toString("hex");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.generateHash = async () => {
  return await crypto.randomBytes(20).toString("hex");
};
