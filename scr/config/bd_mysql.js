const mysql2 = require("mysql2");

const conn = mysql2.createConnection({
    host: "shinkansen.proxy.rlwy.net",
    user: "root",
    password: "VSYfWCmFoZIWRYlESQYdQIUTxlxYdrAV",
    port: 37040,
    database: "railway"
})

conn.connect((erro) => {
    if (erro) console.log("Não foi possível conectar ao banco: " + erro);
    else console.log("Banco conectado");
})

module.exports = conn;