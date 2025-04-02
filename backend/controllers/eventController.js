const Event = require('../models/eventModel');

// CREATE
const createEvent = async (req, res) => {
  const { title, category, date, location, image } = req.body;
  try {
    const event = new Event({ title, category, date, location, image, creator: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

// READ
const getEvents = async (req, res) => {
  const { category, date } = req.query;
  const filter = { approved: true };
  if (category) filter.category = category;
  if (date) filter.date = { $gte: new Date(date) };
  try {
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

// Patvirtinti renginį (tik admin)
const approveEvent = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Draudžiama' });
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!event) return res.status(404).json({ message: 'Renginis nerastas' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

// Įvertinti renginį (vieša sritis)
const rateEvent = async (req, res) => {
  const { rating } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Renginis nerastas' });
    event.ratings.push(rating);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Renginis nerastas' });
    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Draudžiama' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

// DELETE
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Renginis nerastas' });
    if (event.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Draudžiama' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Renginis ištrintas' });
  } catch (error) {
    res.status(500).json({ message: 'Serveris klaida' });
  }
};

module.exports = { createEvent, getEvents, approveEvent, rateEvent, updateEvent, deleteEvent };