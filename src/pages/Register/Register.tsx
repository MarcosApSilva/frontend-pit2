import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  background: #fff;
  background-color: #000080;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Register: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagem, setImagem] = useState('');
  const [ativo, setAtivo] = useState('A');
  const [phone, setPhone] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, usuario, phone, imagem, ativo);
      navigate('/'); // Redireciona após registro
    } catch (error) {
      console.error('Erro no registro:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <Input
          type="text"
          placeholder="Nome de usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registro'}
        </Button>
        <p>
          Já tem uma conta? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
