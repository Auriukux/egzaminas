import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createEvent } from '../services/api';

function EventForm({ onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const event = await createEvent(formData);
      onEventCreated(event);
      setFormData({ title: '', category: '', date: '', location: '', image: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Pavadinimas</Form.Label>
        <Form.Control
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Kategorija</Form.Label>
        <Form.Control
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Vieta</Form.Label>
        <Form.Control
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nuotrauka (URL)</Form.Label>
        <Form.Control
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sukurti
      </Button>
    </Form>
  );
}

export default EventForm;