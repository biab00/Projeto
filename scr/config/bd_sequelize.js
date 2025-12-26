const Sequelize = require("sequelize");

const conn = new Sequelize ("railway", "root", "VSYfWCmFoZIWRYlESQYdQIUTxlxYdrAV", {
    host: "shinkansen.proxy.rlwy.net",
    dialect: "mysql",
    port: 37040,
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