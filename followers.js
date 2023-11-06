const express = require('express');
const router = express.Router();
const dbConn = require('./database');

// Obtener todos los seguidores
router.get('/followers', (req, res) => {
    dbConn.query('SELECT * FROM followers', (error, results) => {
      if (error) return res.status(500).send(error);
      res.json(results);
    });
});
  
// Crear un nuevo seguidor
router.post('/followers', (req, res) => {
    let follower = req.body;
    dbConn.query('INSERT INTO followers SET ?', follower, (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Seguidor agregado' });
    });
});
  
// Eliminar un seguidor
router.delete('/followers/:follower_id/:followed_id', (req, res) => {
    let { follower_id, followed_id } = req.params;
    dbConn.query('DELETE FROM followers WHERE follower_id = ? AND followed_id = ?', [follower_id, followed_id], (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Seguidor eliminado' });
    });
});

module.exports = router;
