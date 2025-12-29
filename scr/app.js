const express = require('express');
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Permite ao sistema procurar e utilizar arquivos ejs 
app.set("view engine", "ejs")
//Nortea o sistema para a pasta "views", permitindo a renderização os arquivos
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))

const rota_1 = require("../scr/router/router")
app.use("/", rota_1)

module.exports = app;