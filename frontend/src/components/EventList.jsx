import { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import EventCard from './EventCard';
import { getEvents } from '../services/api';

function EventList() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '' });

  const fetchEvents = async () => {
    const data = await getEvents(filters);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div>
      <Form onSubmit={handleFilter} className="mb-4">
        <Row>
          <Form.Group className="col-md-4">
            <Form.Label>Kategorija</Form.Label>
            <Form.Control
              type="text"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="col-md-4">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="col-md-2 align-self-end">
            <Button variant="primary" type="submit">
              Filtruoti
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </Row>
    </div>
  );
}

export default EventList;