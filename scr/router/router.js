const controller = require("../controller/init")
const express = require("express")
const rota = express.Router()

rota.get("/", controller.inicio);
rota.post("/cadastro", controller.cadastro);

module.exports = rota;