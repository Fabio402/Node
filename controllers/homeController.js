const mongoose = require('mongoose');
const Post = mongoose.model('Post');
exports.index = async (req,res)=>{
    let resposta = {
        titulo:'Home',
        posts:[]
    };
    const post = await Post.find();
    resposta.posts = post;
    res.render('home', resposta);
}
//res.send('Olá, bem vindo!'); 
//res.json(); //passa como parametro um objeto para enviar ao site ou app
//GET: req.query
//POST: req.body 
//PARAMETROS DE URL: req.params