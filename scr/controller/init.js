const model = require("../model/init")

const inicio = async (req, res) => {
    await model.iniciarBD()
    return res.render("pages/home");
}
const cadastro = async (req, res) => {
    await model.login(req.body);
    res.send("De boa")
}

module.exports = {inicio, cadastro};