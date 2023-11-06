const express = require('express');
const router = express.Router();
const dbConn = require('./database');

// Obtener todos los usuarios
router.get('/users', (req, res) => {
  dbConn.query('SELECT * FROM Users', (error, results, fields) => {
    if (error) res.status(500).send(error);
    res.json(results);
  });
});

// Obtener un solo usuario por ID
router.get('/users/:id', (req, res) => {
  let userId = req.params.id;
  dbConn.query('SELECT * FROM Users WHERE user_id = ?', [userId], (error, results, fields) => {
    if (error) res.status(500).send(error);
    res.json(results[0]);
  });
});

// Crear un nuevo usuario
router.post('/users', (req, res) => {
  let user = req.body;
  dbConn.query('INSERT INTO Users SET ?', user, (error, results, fields) => {
    if (error) res.status(500).send(error);
    res.json({ user_id: results.insertId });
  });
});

// Actualizar un usuario
router.put('/users/:id', (req, res) => {
  let userId = req.params.id;
  let user = req.body;
  dbConn.query('UPDATE Users SET ? WHERE user_id = ?', [user, userId], (error, results, fields) => {
    if (error) res.status(500).send(error);
    res.json({ message: 'Usuario actualizado' });
  });
});

// Eliminar un usuario
router.delete('/users/:id', (req, res) => {
  let userId = req.params.id;
  dbConn.query('DELETE FROM Users WHERE user_id = ?', [userId], (error, results, fields) => {
    if (error) res.status(500).send(error);
    res.json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
