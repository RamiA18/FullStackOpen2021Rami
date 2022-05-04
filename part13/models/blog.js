const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
const yearNow = new Date().getFullYear();

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: yearNow,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blogs",
  }
);

module.exports = Blog;
