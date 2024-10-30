import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useRouter } from 'next/router';
import "../styles/styles.css"; // Asegúrate de importar los estilos

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axiosClient.post('/auth/register', { username, password });
      alert('Usuario registrado con éxito');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      router.push('/tasks');
    } catch (error) {
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div className="authContainer">
      <h2 className="authHeading">Registro o Inicio de Sesión</h2>
      <div className="authFormGroup">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="authInput"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="authInput"
        />
        <div className="authButtonGroup">
          <button onClick={handleRegister} className="authButton">Registrarse</button>
          <button onClick={handleLogin} className="authButton">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
}
