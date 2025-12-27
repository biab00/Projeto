const Sequelize = require("sequelize");

const conn = new Sequelize ("railway", "root", "lfasOPDCpzRwiZMfgjaneUloduzZzone", {
    host: "ballast.proxy.rlwy.net",
    dialect: "mysql",
    port: 43634,
    define: {
        timestamps: false
  }
})

conn.authenticate()
.then(() => {
    console.log("Banco conectado")
})
.catch(() => {
    console.log("Banco não conectado")
})

module.exports = conn;