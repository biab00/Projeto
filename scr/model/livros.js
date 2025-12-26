const livros = sequelize.define("Livros", {
    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(30),
    },
    isbn: {
        type: DataTypes.INTEGER,
    },
});

livros.sync({ alter: true })