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
rota.post("/addItem", controller.add)
rota.get("/inicio", (req, res) => {res.render("pages/PaginaInicial")})

rota.post("/login", controller.login);
rota.post("/cadastro", controller.cadastro);

module.exports = rota;