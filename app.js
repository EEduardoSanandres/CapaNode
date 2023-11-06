const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./users');
const notificationsRouter = require('./notifications');
const postsRouter = require('./posts');
const followersRouter = require('./followers');
const commentsRouter = require('./comments');
const storiesRouter = require('./stories');

const app = express();

// Middleware para parsear el body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/user', userRoutes);
app.use('/notifications', notificationsRouter);
app.use('/posts', postsRouter);
app.use('/followers',followersRouter);
app.use('/comments',commentsRouter);
app.use('/stories',storiesRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
