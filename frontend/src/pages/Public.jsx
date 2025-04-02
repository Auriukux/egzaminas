import EventList from '../components/EventList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Public() {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    document.title = "Renginių sistema";
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Viešas sritis</h2>
        <Button variant="primary" onClick={onLogin}>
          Prisijungimas
        </Button>
      </div>
      <h2>Renginiai mieste</h2>
      <EventList />
    </div>
  );
}

export default Public;