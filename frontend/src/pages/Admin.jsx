import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import EventForm from '../components/EventForm';
import { getEvents, approveEvent, deleteEvent } from '../services/api';

function Admin({ onLogout, role }) {
  const [events, setEvents] = useState([]);


  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    fetchEvents();
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleApprove = async (id) => {
    await approveEvent(id);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Administracinė sritis</h2>
        <Button variant="danger" onClick={onLogout}>
          Atsijungti
        </Button>
      </div>
      <EventForm onEventCreated={handleEventCreated} />
      <h3 className="mt-4">Renginiai</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pavadinimas</th>
            <th>Kategorija</th>
            <th>Data</th>
            <th>Vieta</th>
            <th>Patvirtintas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.category}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.approved ? 'Taip' : 'Ne'}</td>
              <td>
                {role === 'admin' && !event.approved && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(event._id)}
                  >
                    Patvirtinti
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDelete(event._id)}
                >
                  Ištrinti
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;