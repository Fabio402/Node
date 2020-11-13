const mongoose = require('mongoose');//importando mongoose
const Post = mongoose.model('Post');//importando modelo de post para o banco de dados
exports.addPost = (req,res,next)=>{ //Controle da pagina de novos posts 
    res.render('addPost',{
        pagina: 'Novo Post',
        autor: 'Fábio'
    });
};
exports.addPostAction = async (req,res)=>{ //Controle da resposta de adição dos posts
    const post = new Post(req.body);//colhendo dados inseridos na página
    try{
        await post.save();
    }
    catch(error){
        req.flash('error','Erro: '+error.message);
        return req.redirect('/post/add');       
    }
    req.flash('success','Post salvo com sucesso!');//envio do flash para a pagina que exibirá a mensagem de sucesso
    res.redirect('/');
};