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

const EsqSenha: React.FC = () => {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { resetsenha } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetsenha(resetToken, newPassword);
      navigate('/'); // Redireciona após o login
    } catch (error) {
      console.error('Erro na alteração de senha:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Esqueceu minha senha</h2>
        <Input
          type="text"
          placeholder="resetToken"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
        />
        <Input
          type="password"
          placeholder="NewPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        <p>
          Já tenho conta? <Link to="/">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default EsqSenha;
