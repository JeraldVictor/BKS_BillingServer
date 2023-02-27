require("dotenv").config();
module.exports = {
  PORT: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
      host: process.env.DB_HOST,
      dialect: process.env.DB_ENGINE,
      port: process.env.DB_PORT,
      ...(process.env.DB_ENGINE == "mariadb"
        ? {
            logging: false,
            dialectOptions: {
              timezone: "Etc/GMT-5",
            },
          }
        : {
            logging: false,
          }),
    },
  },
};
