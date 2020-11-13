//requisições de pacotes de instalação de funcionamento
const express = require('express');//funções de uso do servidor
const mustache = require('mustache-express');//funções do mustache para criar sites
const cookieParser = require('cookie-parser');//funçoes de cookies da pagina
const session = require('express-session');
const flash = require('express-flash');
//requisições de documentos que eu criei
const router = require("./routes/index");//local onde estão configuradas as rotas de uso do site
const helpers = require('./helpers');//local dos dados gerais de peenchimento das paginas
const errorHandler = require('./handlers/errorHandler');//local das rotas de erro
//configurações do app
const app = express();
//premite usar dados enviados via POST
app.use(express.json());//o mesmo que body-parser ->
app.use(express.urlencoded({extended:true}));
//habilitar cookies
app.use(cookieParser(process.env.SECRET));//passar a chave para decodificar os cookies
//habilitar sessão
app.use(session({
    secret: process.env.SECRET, //chave de acesso pada decodificar cookies
    resave:false, //comando para não recriar a sessão se não houver modificações
    saveUninitialized: false //não salvar dados em branco
}));
//Usar flash. É preciso hablitar cookies e sessão para isso
app.use(flash());//já é possivel salvar mensagens para serem exibidas em qualquer lugar.
//configurando o uso do aquivo helpers.js para colocar h.(variavel que deseja-se usar do arquivo)
//middleware do tipo global: são especificados por use
app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.flashes = req.flash(); //habilitar o uso das mensagens em qualquer pagina
    next();
}); 
app.use('/',router);//iniciando as rotas - deve ser o ultimo use a ser inserido
app.use(errorHandler.notFound);//não achou a rota da página selecionada
//definindo o tipo de arquivo usado como partial e informando onde as partes de arquivos estão
app.engine('mst', mustache(__dirname+'/views/Partials','.mst'));
app.set('view engine', 'mst');//setando as views para serem renderizadas
app.set('views', __dirname+'/views');//localizando as views das rotas
module.exports = app; 