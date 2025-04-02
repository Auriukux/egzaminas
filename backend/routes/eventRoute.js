const express = require('express');
const router = express.Router();
const { createEvent, getEvents, approveEvent, rateEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Vieša sritis (nereikia autentifikacijos)
router.get('/', getEvents);
router.post('/:id/rate', rateEvent);

// Administracinė sritis (reikalinga autentifikacija)
router.post('/', protect, createEvent); 
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.put('/:id/approve', protect, adminOnly, approveEvent); 

module.exports = router;