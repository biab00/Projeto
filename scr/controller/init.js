const model = require("../model/init")

const inicio = async (req, res) => {
    await model.iniciarBD()
    return res.render("pages/home");
}

const cadastro = async (req, res) => {
    await model.cadastro(req.body);
    res.send("De boa")
}


const login = async (req, res) => {
    const mensagem = await model.login(req.body);
    console.log(mensagem);
    res.render("pages/PaginaInicial")
}

module.exports = {inicio, cadastro, login};