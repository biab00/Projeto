const model = require("../model/model")

const inicio = async (req, res) => {
    return res.render("pages/home");
}

const cadastro = async (req, res) => {
    await model.cadastro(req.body)
    res.render("pages/paginaInicial");
}


const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result == 1) res.redirect("/inicio");
    else res.send(result)
}

const livros = async (req, res) => {
    const livros = await model.todos_livros() 
    res.render("pages/objetos/livros", {livros})
}

const jogos = async (req, res) => {
    const jogos = await model.todos_jogos() 
    res.render("pages/objetos/jogos", {jogos})
}

const tv = async (req, res) => {
    const tv = await model.todos_tv() 
    res.render("pages/objetos/tv", {tv})
}

const datas = async (req, res) => {

}

const musicas = async (req, res) => {
    const musicas = await model.todas_musicas() 
    res.render("pages/objetos/musica", {musicas})
}

const add = async (req, res) => {
    const result = await model.add(req.body)
    if (result) {
        res.redirect("/inicio");
    }
}

module.exports = {inicio, cadastro, login, livros, jogos, tv, datas, add, musicas};