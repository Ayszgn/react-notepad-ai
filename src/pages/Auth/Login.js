import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; 

import './Auth.css';

function Login() {
  const navigate = useNavigate(); //yönlendirme işlemi için hazırlandı

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // kullanıcıdan alınan email şifre burada tutuluyor hatalı giriş olursa error
  const [error, setError] = useState('');

  const goToRegister = () => {
    navigate('/Register');
  };

  const handleLogin = async (e) => {
    e.preventDefault(); //firebase'e login isteği gitmeden sayfa yenilenmesini önler.
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password); //trim string başındaki ve sonundaki boşlukları siler.
      navigate('/Notlar'); 
    } catch (err) {
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="page-container">
      <div className="shining-header">
        <h1 className="project-name">ThinkBoard</h1>
        <div className="stars">
          <span className="star" style={{ top: '-10px', left: '-20px' }}></span>
          <span className="star" style={{ top: '-5px', right: '-30px' }}></span>
          <span className="star" style={{ bottom: '-25px', left: '10px' }}></span>
          <span className="star" style={{ bottom: '-40px', right: '-5px' }}></span>
          <span className="star" style={{ top: '70%', left: '-80px' }}></span>
          <span className="star" style={{ top: '30%', right: '-300px' }}></span>
          <span className="star" style={{ top: '30%', right: '300px' }}></span>
          <span className="star" style={{ top: '50%', right: '600px' }}></span>
          <span className="star" style={{ top: '60%', right: '-600px' }}></span>
          <span className="star" style={{ top: '90%', right: '-150px' }}></span>
          <span className="star" style={{ top: '40%', right: '-100px' }}></span>
        </div>
      </div>

      <div className="login-container">
        <h2 className="login-title">Giriş Yap</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Giriş Yap</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="register-text">Hesabınız yok mu?</p>
        <button onClick={goToRegister} className="register-button">Kayıt Ol</button>
      </div>
    </div>
  );
}

export default Login;//bu bileşeni başka yerlerde kullanmak için export edildi





