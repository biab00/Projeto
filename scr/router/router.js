const controller = require("../controller/init")
const express = require("express")
const rota = express.Router()

rota.get("/", controller.inicio);
rota.get("/cadastro", (req, res) => res.render("pages/cadastro"));
rota.get("/login", (req, res) => res.render("pages/home"));
rota.get("/config", (req, res) => res.render("pages/home"));
rota.get("/livros", (req, res) => res.render("pages/home"));
rota.get("/jogos", (req, res) => res.render("pages/home"));
rota.get("/TV", (req, res) => res.render("pages/home"));
rota.get("/calendario", (req, res) => res.render("pages/home"));

rota.post("/login", controller.login);
rota.post("/cadastro", controller.cadastro);

module.exports = rota;