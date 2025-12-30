const model = require("../model/model")

//objetos
const modelLivro = require("../model/livros");
const modelJogo = require("../model/jogos");
const modelMusica = require("../model/musicas");
const modelTv = require("../model/tv");
const modelChat = require("../model/chat");


//BÁSICO
const inicio = async (req, res) => {
    return res.render("pages/home");
}

const cadastro = async (req, res) => {
    await model.cadastro(req.body)
    res.render("pages/paginaInicial");
}


const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result == 1) {
        res.redirect("/inicio");
    }
    else {
        res.send(result)
    }
}

const addChat = async (req, res) => {
    await modelChat.add(req.body.mensagem,req.body.user)
    res.redirect("/chat")
}

const add = async (req, res) => {
    if (req.body.tipo == "livro") {
        const modelLivro = require("../model/livros");
        const result = await modelLivro.buscarLivros(req.body.nome);
        res.render("pages/consultas/livros", {result});
    }
    if (req.body.tipo == "tv") {
        const modelTv = require("../model/tv");
        
        if (req.body.tipo_tv == "serie") {
            const result = await modelTv.buscarTV(req.body.nome);          
            for(let i = 0; i<result.lenght; i++) {
                for(let e = 0; e<result[i].genres.lenght; e++){
                    result[i].genres[e].name = model.dicionario(result[i].genres[e].name)
                }
            }
            res.render("pages/consultas/tv", {result});
        }else{
            const result = await modelTv.buscarFilme(req.body.nome);
            for(let i = 0; i<result.lenght; i++) {
                for(let e = 0; e<result[i].genres.lenght; e++){
                    result[i].genres[e].name = model.dicionario(result[i].genres[e].name)
                }
            }
            res.render("pages/consultas/tv(film)", {result});
        }
    }
    if (req.body.tipo == "jogo") {
        const modelJogo = require("../model/jogos");
        const result = await modelJogo.buscarJogos(req.body.nome);
        res.render("pages/consultas/jogos", {result});
    }
    if (req.body.tipo == "musica") {
        const modelMusica = require("../model/musicas");
        const result = await modelMusica.buscarMusicas(req.body.nome); 
        res.render("pages/consultas/musicas", {result});
    }
}


//LIVROS
const livros = async (req, res) => {
    const livros = await modelLivro.todos_livros() 
    res.render("pages/objetos/livros", {livros})
}

const addLivro = async (req, res) => {
    await modelLivro.add(req.params.id)
    res.redirect("/livros")
}

const deleteLivro = async (req, res) => {
    await modelLivro.delet(req.params.id)
    res.redirect("/livros")
}



//JOGOS
const jogos = async (req, res) => {
    const jogos = await modelJogo.todos_jogos()
    res.render("pages/objetos/jogos", {jogos})
}

const addJogo = async (req, res) => {
    await modelJogo.add(req.params.id)
    res.redirect("/jogos")
}

const deleteJogo = async (req, res) => {
    await modelJogo.delet(req.params.id)
    res.redirect("/jogos")
}


//TV
const tv = async (req, res) => {
    const tv = await modelTv.todos_tv() 
    res.render("pages/objetos/tv", {tv})
}

const addTv = async (req, res) => {
    await modelTv.add(req.params.id, req.params.tipo)
    res.redirect("/TV")
}

const deleteTV = async (req, res) => {
    await modelTv.delet(req.params.id)
    res.redirect("/TV")
}


//CALENDÁRIO
const datas = async (req, res) => {

}


//MÚSICAS
const addMusica = async (req, res) => {
    await modelMusica.add(req.params.id)
    res.redirect("/musicas")
}

const musicas = async (req, res) => {;
    const musicas = await modelMusica.todas_musicas()
    res.render("pages/objetos/musica", {musicas}) 
}

const deleteMusica = async (req, res) => {
    await modelMusica.delet(req.params.id)
    res.redirect("/musicas")
}

const musicos = async (req, res) => {;
    const musicos = await modelMusica.buscarArtista(req.params.id)
    const top = await modelMusica.buscarTopArte(req.params.id)
    const musicas = [];
        for (let i = 0; i < 10; i++) {
          const reponse = await fetch(`https://api.deezer.com/track/${top[i].id}`);
          const musica = await reponse.json(); 
          musicas.push(musica);  
          musicas[i].release_date = new Date(musicas[i].release_date).toLocaleDateString("pt-BR");
        }
    res.render("pages/consultas/mugiscos", {musicos, musicas}) 
}

//Chat 
const chat = async (req, res) => {
    const result = await modelChat.todos_chat();
    const cores = []
    for(let i = 0; i<result.length; i++) {
        const cor = model.cor_aleatorio()
        cores.push(cor)
        if(result[i].usuario == "Juju"){
            result[i].usuario = "Euu"
        }
    }
    
    res.render("pages/objetos/chat", { result, cores });
}

module.exports = {inicio, cadastro, login, livros, jogos, tv, datas, add, musicas, addJogo, deleteJogo, addMusica, deleteMusica, addTv, addLivro, deleteLivro, deleteTV, musicos, chat, addChat};