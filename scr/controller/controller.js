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
    req.session.username = req.body.username
    res.redirect("/inicio");
}


const login = async (req, res) => {
    const result = await model.login(req.body);
    if (result == 1) {
        req.session.username = req.body.username
        res.redirect("/inicio");
    }
    else {
        res.send(result)
    }
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
    res.render("pages/objetos/calendario")
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
    let nomes = []
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    for(let i = 0; i<result.length; i++) {
        
        nomes.push(result[i].usuario)
        
        nomes = Array.from(new Set(nomes))
        
        if(result[i].usuario == req.session.username){
            result[i].usuario = "Euu"
        }
    }
    if(req.query.json){    
        return res.json(result);
    }

    result.remetente = req.session.username
    if(req.session.username){
        res.render("pages/objetos/chat", { result });
    }
    else{
        res.redirect("/login")
    }
}

const addChat = async (req, res) => {
    await modelChat.add(req.body.mensagem,req.body.user)
    res.redirect("/chat")
}

const deletChat = async(req, res) => {
    await modelChat.delet()
    res.redirect("/chat")
}

const galeria = async (req, res) => {
    let response_img = 9
    let response_vid = 17;
    if(req.params.tipo == "filme"){
        response_img = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/images?api_key=a3a6cb857a527d340a4234a5e2d1c7f5`)
        response_vid = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=a3a6cb857a527d340a4234a5e2d1c7f5`)
    } else if (req.params.tipo == "serie") {
        response_img = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}/images?api_key=a3a6cb857a527d340a4234a5e2d1c7f5`)
        response_vid = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}/videos?api_key=a3a6cb857a527d340a4234a5e2d1c7f5`)
    }


    let imagens = await response_img.json()
    imagens = imagens.backdrops

    let videos = await response_vid.json()
    videos = videos.results

    return res.render("pages/consultas/galeria", {imagens, videos})
}

const conta = async (req, res) => {
    if(req.session.username){
        const user = await model.config(req.session.username)
        return res.render("pages/objetos/config", {user})
    }
    else{
        res.redirect("/login")
    }
}

const atualizar_conta = async (req, res) => {
    await model.atualizar_conta(req.body)
    res.redirect("/config")
}


module.exports = {inicio, cadastro, login, livros, jogos, tv, datas, add, musicas, addJogo, deleteJogo, addMusica, deleteMusica, addTv, addLivro, deleteLivro, deleteTV, musicos, chat, addChat, deletChat, galeria, conta,atualizar_conta};