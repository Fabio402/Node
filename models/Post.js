//importar
const mongoose = require('mongoose');
const slug = require('slug')
mongoose.Promise = global.Promise;//Tipo de comandos que serão usados no banco de dados
//Definir estrutura de dados do banco
const postSchema = new mongoose.Schema({
    //O campo pode ter varias definições como em title, ou apenas 1 como em slug
    title:{
        type:String, //tipo de titlulo 
        trim:true, //Retira espaços desnecessários
        required:'O post precisa de um titulo' //torna titulo obrigatório
    },
    slug:String,
    body:{
        type:String,
        trim:true
    },
    tags:[String]//campo com mais de uma entrada
});
//setar eventos // acontece antes de salvar
postSchema.pre('save', function(next){
    if( this.isModified('title') ){ 
        this.slug = slug(this.title, {lower: true});//pega o titulo e salva como a slug do post
    }
    next();
});
module.exports = mongoose.model('Post', postSchema);