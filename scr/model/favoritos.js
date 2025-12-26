const favoritos = sequelize.define("Favoritos", {
  tipo: {
    type: DataTypes.STRING(50),
  },
  usuario: {
    type: DataTypes.STRING(20),
  },
  nome: {
    type: DataTypes.STRING(30),
  },
});

favoritos.sync({alter: true})