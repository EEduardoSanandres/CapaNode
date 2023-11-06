const express = require('express');
const router = express.Router();
const dbConn = require('./database'); // Asegúrate de tener un archivo database.js que exporte la conexión a la DB

// Obtener todas las historias
router.get('/', (req, res) => {
    dbConn.query('SELECT * FROM stories', (error, results) => {
      if (error) return res.status(500).send(error);
      res.json(results);
    });
});

// Crear una nueva historia
router.post('/', (req, res) => {
    let story = req.body;
    dbConn.query('INSERT INTO stories SET ?', story, (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ message: 'Historia creada', storyId: results.insertId });
    });
});

// Actualizar una historia
router.put('/:story_id', (req, res) => {
    let { story_id } = req.params;
    let updateData = req.body;
    dbConn.query('UPDATE stories SET ? WHERE story_id = ?', [updateData, story_id], (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Historia actualizada' });
    });
});

// Eliminar una historia
router.delete('/:story_id', (req, res) => {
    let { story_id } = req.params;
    dbConn.query('DELETE FROM stories WHERE story_id = ?', story_id, (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Historia eliminada' });
    });
});

module.exports = router;

