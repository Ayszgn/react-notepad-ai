import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Notlar from './pages/Notlar/Notlar';
import NotEkle from './pages/NotEkle/NotEkle';
import NotDetay from './pages/NotDetay/NotDetay'; 
import NotDuzenle from './pages/NotDuzenle/NotDuzenle';
import CopKutusu from './pages/CopKutusu/CopKutusu';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Anasayfaya yönlendirme */}
        <Route path="/" element={<Navigate to={user ? "/notlar" : "/login"} />} />

        {/* Giriş ve kayıt sayfaları */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/notlar" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/notlar" />} />

        {/* Korunması gereken sayfalar */}
        <Route path="/notlar" element={user ? <Notlar /> : <Navigate to="/login" />} />
        <Route path="/not-ekle" element={user ? <NotEkle /> : <Navigate to="/login" />} />
        <Route path="/not/:id" element={user ? <NotDetay /> : <Navigate to="/login" />} />
        <Route path="/not-duzenle/:id" element={user ? <NotDuzenle /> : <Navigate to="/login" />} />
        <Route path="/cop-kutusu" element={user ? <CopKutusu /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


