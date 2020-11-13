const mongoose = require('mongoose');
require('dotenv').config({path:"variables.env"});//local para criar variáveis
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.error("Erro: "+error.message);
});
//Carregar models
require('./models/Post');
const app = require('./app'); //deve-se carregar os dados do mongoose antes de inicar o app
//indicar em que porta a conexão do servidor ocorrerá
app.set('port',process.env.PORT || 7777);
//iniciar o servidor e aguardar a conexão na porta especificada
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: "+server.address().port);
});