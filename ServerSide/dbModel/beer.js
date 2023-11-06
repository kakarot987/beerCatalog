module.exports = (sequelize, DataTypes) => {

const Beer = sequelize.define('Beer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photos: {
    type: DataTypes.STRING, // You might want to store image URLs here
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
});

return Beer;
};