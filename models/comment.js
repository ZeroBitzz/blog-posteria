'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE'
    })
  };
  return Comment;
};