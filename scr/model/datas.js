const datas = sequelize.define("Datas", {
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Evento: {
    type: DataTypes.STRING(500),
  },
  usuario: {
    type: DataTypes.STRING(200),
  },
});

datas.sync({alter: true})