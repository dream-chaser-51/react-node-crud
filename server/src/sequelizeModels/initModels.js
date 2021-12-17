const DataTypes = require("sequelize").DataTypes;
const _users = require("./users");
const _students = require("./students");
function initModels(sequelize) {

  const users = _users(sequelize, DataTypes);
  const studentDetails = _students(sequelize, DataTypes);

  return {
    users,
    studentDetails
  };

}

module.exports = initModels;
