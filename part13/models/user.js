const { DataTypes, Model }= require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
    notEmpty:{
      args:true,
      msg:"Name required"
    },
    is:{
      args:["^[a-z]+$",'i'],
      msg:"Only letters are allowed"
    },
    len: {
      args: [2,12],
      msg: "Name must be between 2 and 12 characters"
    }
  }
  },
  username:{
    type: DataTypes.TEXT,
    unique:true,
    allowNull: false,
    validate:{
      isEmail: true
    },
  },
  disabled:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false
  }
},{
  sequelize,
  underscored: true,
  modelName: 'users'
})

module.exports = User