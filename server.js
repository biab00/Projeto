const app = require("./scr/app")

//Versão
let versao = Date.now()

const mudanca = () =>  {
    versao = Date.now()
}

app.get("/api/verificar", (req, res) => {
    res.json({versao: versao})
})


app.listen(3000, () => {
    console.log("servidor em: http://localhost:3000");
})

module.exports = {mudanca, versao}