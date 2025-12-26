const jogos = sequelize.define("Jogos", {
    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    criador: {
        type: DataTypes.STRING(20),
    },
    ano: {
        type: DataTypes.STRING(4),
    },
    plataforma: {
        type: DataTypes.STRING(60),
    },
});

jogos.sync({ alter: true })