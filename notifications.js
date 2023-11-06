const express = require('express');
const router = express.Router();
const dbConn = require('./database'); // Asegúrate de tener un archivo database.js que exporte la conexión a la DB

// Obtener todas las notificaciones
router.get('/', (req, res) => {
    dbConn.query('SELECT * FROM notifications', (error, results) => {
      if (error) return res.status(500).send(error);
      res.json(results);
    });
});

// Crear una nueva notificación
router.post('/', (req, res) => {
    let notification = req.body;
    dbConn.query('INSERT INTO notifications SET ?', notification, (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).json({ message: 'Notificación creada', notificationId: results.insertId });
    });
});

// Marcar una notificación como leída
router.put('/:notification_id', (req, res) => {
    let { notification_id } = req.params;
    dbConn.query('UPDATE notifications SET is_read = 1 WHERE notification_id = ?', notification_id, (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Notificación actualizada' });
    });
});

// Eliminar una notificación
router.delete('/:notification_id', (req, res) => {
    let { notification_id } = req.params;
    dbConn.query('DELETE FROM notifications WHERE notification_id = ?', notification_id, (error, results) => {
      if (error) return res.status(500).send(error);
      res.json({ message: 'Notificación eliminada' });
    });
});

module.exports = router;
