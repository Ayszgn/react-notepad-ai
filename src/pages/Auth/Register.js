import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; 

import './Auth.css';

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');    //kullanıcının formda girdiği değerler tutuluyor
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const REDIRECT_DELAY = 2000;

  const goToLogin = () => {
    navigate('/Login');
  };

  const handleRegister = async (e) => { //firebase asenkron işlemlerdir bu yüzden async yazarız ki beklemek mümkün olsun.
    e.preventDefault(); //sayfa yenilenmesin diye
    setError(''); 
    setSuccess(''); //önceki hata ve başarı mesajları siliniyor

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      setTimeout(() => navigate('/Login'), REDIRECT_DELAY); //giriş başarılıysa 2sn sonra login sayfasına yönlendir.
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Bu e-posta adresi zaten kullanılıyor.');
      } else if (err.code === 'auth/weak-password') {
        setError('Şifre en az 6 karakter olmalıdır.');
      } else {
        setError('Kayıt başarısız. Bilgileri kontrol edin.');
      }
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
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
      </header>

      <div className="login-container">
        <h2 className="login-title">Kayıt Ol</h2>
        <form className="login-form" onSubmit={handleRegister}>
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
            required //alanlar boş geçilemez
            minLength={6}
          />
          <button type="submit" className="login-button">Kayıt Ol</button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p className="register-text">Zaten bir hesabınız var mı?</p>
        <button onClick={goToLogin} className="register-button">Giriş Yap</button>
      </div>
    </div>
  );
}

export default Register;



