const express = require('express');
const router = express.Router();
const dbConn = require('./database'); // Asegúrate de tener un archivo database.js que exporte la conexión a la DB

// Obtener todos los posts
router.get('/', (req, res) => {
    dbConn.query('SELECT * FROM posts', (error, results) => {
      if (error) return res.status(500).send(error);
      res.json(results);
    });
});

// Crear un nuevo post
router.post('/', (req, res) => {
    let post = req.body;
    dbConn.query('INSERT INTO posts SET ?', post, (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ message: 'Post creado', postId: results.insertId });
    });
});

// Actualizar un post
router.put('/:post_id', (req, res) => {
    let { post_id } = req.params;
    let post = req.body;
    dbConn.query('UPDATE posts SET ? WHERE post_id = ?', [post, post_id], (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Post actualizado' });
    });
});

// Eliminar un post
router.delete('/:post_id', (req, res) => {
    let { post_id } = req.params;
    dbConn.query('DELETE FROM posts WHERE post_id = ?', post_id, (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Post eliminado' });
    });
});

module.exports = router;
