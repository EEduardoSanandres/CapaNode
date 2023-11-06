const express = require('express');
const router = express.Router();
const dbConn = require('./database');

// Obtener todos los comentarios
router.get('/comments', (req, res) => {
  dbConn.query('SELECT * FROM comments', (error, results) => {
    if (error) res.status(500).send(error);
    res.json(results);
  });
});

// Obtener un comentario por ID
router.get('/comments/:id', (req, res) => {
  let commentId = req.params.id;
  dbConn.query('SELECT * FROM comments WHERE comment_id = ?', [commentId], (error, results) => {
    if (error) res.status(500).send(error);
    res.json(results[0]);
  });
});

// Crear un nuevo comentario
router.post('/comments', (req, res) => {
  let comment = req.body;
  dbConn.query('INSERT INTO comments SET ?', comment, (error, results) => {
    if (error) res.status(500).send(error);
    res.json({ comment_id: results.insertId });
  });
});

// Actualizar un comentario
router.put('/comments/:id', (req, res) => {
  let commentId = req.params.id;
  let comment = req.body;
  dbConn.query('UPDATE comments SET ? WHERE comment_id = ?', [comment, commentId], (error, results) => {
    if (error) res.status(500).send(error);
    res.json({ message: 'Comentario actualizado' });
  });
});

// Eliminar un comentario
router.delete('/comments/:id', (req, res) => {
  let commentId = req.params.id;
  dbConn.query('DELETE FROM comments WHERE comment_id = ?', [commentId], (error, results) => {
    if (error) res.status(500).send(error);
    res.json({ message: 'Comentario eliminado' });
  });
});

module.exports = router;
