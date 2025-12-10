import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';//firestore sorgusu kurmak
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Notlar.css';
import { signOut } from "firebase/auth";

function Notlar() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return; //kullanıcı oturum açmamışsa durur.

    const q = query(
      collection(db, 'notes'),
      where('uid', '==', auth.currentUser.uid),   // notes koleksiyonunda giriş yapanın uidsine ve tarih sırasına göre sorgu
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => { //onSnapshot: gerçek zamanlı veri dinleme
      const notesArray = []; //geçici dizi                 //querySnapshot:sorgudan dönen belgeler
      querySnapshot.forEach((doc) => {
        notesArray.push({ id: doc.id, ...doc.data() }); //tüm belgeler döngü ile geziliyor.
      });
      setNotes(notesArray); //notlar state'e ekranda gözükmesi için
    });

    return () => unsubscribe(); //onSnapshot dinleyicisi kapatılır. gereksiz dinleme ve bellek sızıntısı önlenir.
  }, []);

  const handleNotEkle = () => {
    navigate('/not-ekle');
  };

  const handleCopKutusu = () => {
    navigate('/cop-kutusu');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Çıkış yapılamadı:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="icon-buttons">
        <button className="logout-icon-button" onClick={handleLogout} title="Çıkış Yap">
          <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
        </button>
        <button className="trash-icon-button" onClick={handleCopKutusu} title="Çöp Kutusu">
          <FontAwesomeIcon icon={faTrash} size="2x" />
        </button>
      </div>

      <header className="page-header">
        <h1 className="project-name">ThinkBoard</h1>
        <button className="note-add-button" onClick={handleNotEkle}>
          <FontAwesomeIcon icon={faPencil} /> Not Ekle
        </button>
      </header>

      <div className="notes-container">
        {notes.length === 0 ? (
          <p>Henüz not yok.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => navigate(`/not/${note.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="note-title">
                  {note.title || 'Başlıksız Not'}
              </h3>

              <p className="note-preview">
                  {note.text.length > 100 ? `${note.text.slice(0, 100)}...` : note.text}
              </p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notlar;









