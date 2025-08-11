import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const OAuthRedirectHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        login({ token, user: res.data.user });
        navigate('/home');
      })
      .catch((err) => {
        console.error('OAuth login failed', err);
        navigate('/login');
      });
  }, []);

  return <div className="text-center mt-20 text-lg">Logging you in with Google...</div>;
};

export default OAuthRedirectHandler;
