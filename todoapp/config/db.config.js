const { sequelize } = require("../models/postgresql/");

async function connectPGDB() {
  try {
    await sequelize.authenticate({ force: true });
    console.log("Database Connected!");
  } catch (error) {
    console.log({ error });
  }
}

module.exports = { connectPGDB };
