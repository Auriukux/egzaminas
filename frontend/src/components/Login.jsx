import { useState } from 'react';
import { login, register } from '../services/api';
import { Form, Button, Tab, Tabs } from 'react-bootstrap';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      onLogin(token, email.includes('admin') ? 'admin' : 'user');
    } catch (err) {
      setError(err.response?.data?.message || 'Klaida prisijungiant');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      const { token } = await register(data);
      onLogin(token, name === 'admin' ? 'admin' : 'user');
    } catch (err) {
      setError(err.response?.data?.message || 'Klaida registruojantis');
    }
  };

  return (
    <div>
      <h2>Vartotojo prisijungimas ir registracija</h2>
      {error && <p className="text-danger">{error}</p>}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="login" title="Prisijungimas">
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>El. paštas</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slaptažodis</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Prisijungti
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Registracija">
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Vardas</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>El. paštas</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slaptažodis</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Registruotis
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Login;