const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return students.init(sequelize, DataTypes);
}

class students extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      dob: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      mobileNumber: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      department: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
    }, {
      sequelize,
      tableName: 'student_details',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
    return students;
  }
}
