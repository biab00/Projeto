const tv = sequelize.define("TV", {
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(20),
  },
  ano: {
    type: DataTypes.STRING(4),
  },
});

tv.sync({alter: true})