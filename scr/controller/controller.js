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

const addLivro = async (req, res) => {
    await modelLivro.add(req.params.id)
    res.redirect("/livros")
}

const addTv = async (req, res) => {
    await modelTv.add(req.params.id)
    res.redirect("/TV")
}
const musicas = async (req, res) => {;
    const musicas = await modelMusica.todas_musicas()
    res.render("pages/objetos/musica", {musicas}) 
}

const add = async (req, res) => {
    if (req.body.tipo == "livro") {
        const modelLivro = require("../model/livros");
        const result = await modelLivro.buscarLivros(req.body.nome);
        res.render("pages/consultas/livros", {result});
    }
    if (req.body.tipo == "tv") {
        const modelTv = require("../model/tv");
        const result = await modelTv.buscarTV(req.body.nome);
        res.render("pages/consultas/tv", {result});
    }
    if (req.body.tipo == "jogo") {
        const modelJogo = require("../model/jogos");
        const result = await modelJogo.buscarJogos(req.body.nome);
        res.render("pages/consultas/jogos", {result});
    }
    if (req.body.tipo == "musica") {
        const modelMusica = require("../model/musicas");
        const result = await modelMusica.buscarMusicas(req.body.nome);
        let todos = await modelMusica.musica.findAll();
        todos = todos.map(m => m.dataValues.id);
        for (let i = 0; i < result.length; i++){
                    if (todos.includes(result[i].id)){
                        result[i].adicionado = true;
                    } else{
                        result[i].adicionado = false;
                    }
            } 
        res.render("pages/consultas/musicas", {result});
    }
}

const deleteJogo = async (req, res) => {
    await modelJogo.delet(req.params.id)
    res.redirect("/jogos")
}

const deleteMusica = async (req, res) => {
    await modelMusica.delet(req.params.id)
    res.redirect("/musicas")
}

const deleteLivro = async (req, res) => {
    await modelLivro.delet(req.params.id)
    res.redirect("/livros")
}

const deleteTV = async (req, res) => {
    await modelTv.delet(req.params.id)
    res.redirect("/TV")
}

module.exports = {inicio, cadastro, login, livros, jogos, tv, datas, add, musicas, addJogo, deleteJogo, addMusica, deleteMusica, addTv, addLivro, deleteLivro, deleteTV};