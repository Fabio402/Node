//rotas de acesso do site
const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController')
const router = express.Router();
//rotas
//rota home
router.get('/', homeController.index);
//rota de login
router.get('/users/login', userController.login);
//rota de posts
router.get('/posts/new-post', postController.addPost);
router.post('/posts/new-post', postController.addPostAction);
module.exports = router;