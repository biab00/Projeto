const controller = require("../controller/controller")
const express = require("express")
const rota = express.Router()

rota.get("/", controller.inicio);
rota.get("/config", (req, res) => res.render("pages/objetos/config"));
rota.get("/livros", controller.livros);
rota.get("/jogos", controller.jogos);
rota.get("/TV", controller.tv);
rota.get("/calendario", controller.datas);
rota.get("/musicas", controller.musicas);
rota.get("/add", (req, res) => res.render("pages/create"));
rota.post("/mostrarItem", controller.add)
rota.get("/addItem/:id", controller.addJogo)
rota.get("/addMusica/:id", controller.addMusica)
rota.get("/deleteItem/:id", controller.deleteJogo)
rota.get("/inicio", (req, res) => {res.render("pages/PaginaInicial")})

rota.get("/buscar/jogo/:nome", async (req, res) => {
    const modelJogos = require("../model/jogos");
    const jogos = await modelJogos.buscarJogos(req.params.nome);
    //jogos.sumary(traduzir), jogos.name, jogos.cover.url, jogos.first_release_date, jogos.plataforms
    res.json(jogos);
});

rota.get("/buscar/musica/:nome", async (req, res) => {
    const modelMusicas = require("../model/musicas");
    const musicas = await modelMusicas.buscarMusicas(req.params.nome);
    res.redirect("/musicas");
});

rota.get("/buscar/tv/:nome", async (req, res) => {
    const modelTv = require("../model/tv");
    const tv = await modelTv.buscarTV(req.params.nome);
    res.redirect("/TV");
});

rota.get("/buscar/livro/:nome", async (req, res) => {
    const modelLivro = require("../model/livros");
    const livro = await modelLivro.buscarLivros(req.params.nome);
    res.redirect("/livros");
});

rota.get("/login", (req, res) => res.render("pages/login"));
rota.get("/cadastro", (req, res) => res.render("pages/cadastro"));


rota.post("/login", controller.login);
rota.post("/cadastro", controller.cadastro);

module.exports = rota;