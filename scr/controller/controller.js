const model = require("../model/model")

//objetos
const modelLivro = require("../model/livros");
const modelJogo = require("../model/jogos");
const modelMusica = require("../model/musicas");
const modelTv = require("../model/tv");

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
    const livros = await modelLivro.todos_livros() 
    res.render("pages/objetos/livros", {livros})
}

const jogos = async (req, res) => {
    const jogos = await modelJogo.todos_jogos()
    res.render("pages/objetos/jogos", {jogos})
}

const tv = async (req, res) => {
    const tv = await modelTv.todos_tv() 
    res.render("pages/objetos/tv", {tv})
}

const datas = async (req, res) => {

}

const addJogo = async (req, res) => {
    await modelJogo.add(req.params.id)
    res.redirect("/jogos")
}

const addMusica = async (req, res) => {
    await modelMusica.add(req.params.id)
    res.redirect("/musicas")
}
const musicas = async (req, res) => {
    const musicas = await modelMusica.todas_musicas() 
}

const add = async (req, res) => {
    const result = await model.add(req.body)
    if (result) {
        res.render("pages/consultas/musicas", {result});
    }
}

const deleteJogo = async (req, res) => {
    await modelJogo.delet(req.params.id)
    res.redirect("/jogos")
}

module.exports = {inicio, cadastro, login, livros, jogos, tv, datas, add, musicas, addJogo, deleteJogo, addMusica};