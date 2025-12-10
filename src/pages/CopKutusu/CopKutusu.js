import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, where, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import './CopKutusu.css';

function CopKutusu() {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  if (!auth.currentUser) return;

  const q = query(
    collection(db, 'deletedNotes'),
    where('uid', '==', auth.currentUser.uid),   
    orderBy('deletedAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDeletedNotes(notes);
    setLoading(false);
  }, (err) => {
    console.error('Çöp kutusu yüklenirken hata:', err);
    setError('Çöp kutusu yüklenirken hata oluştu.');
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const handleRestore = async (note) => {
  const confirmRestore = window.confirm(`"${note.text.substring(0, 20)}..." notunu geri yüklemek istediğinize emin misiniz?`);
  if (!confirmRestore) return;

  try {
    const { deletedAt, ...restNote } = note;

    const noteRef = doc(db, 'notes', note.id);
    await setDoc(noteRef, {
      ...restNote,
      uid: note.uid,              
      restoredAt: new Date()
    });

    const deletedRef = doc(db, 'deletedNotes', note.id);
    await deleteDoc(deletedRef);    

    alert('Not başarıyla geri yüklendi.');
  } catch (err) {
    console.error('Geri yükleme hatası:', err);
    alert('Geri yükleme sırasında hata oluştu.');
  }
};



  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm('Notu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz!');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'deletedNotes', id)); 
      alert('Not kalıcı olarak silindi.');
    } catch (err) {
      console.error('Kalıcı silme hatası:', err);
      alert('Kalıcı silme sırasında hata oluştu.');
    }
  };

  if (loading) return <div className="page-container"><p>Yükleniyor...</p></div>;
  if (error) return <div className="page-container"><p>{error}</p></div>;           

  if (deletedNotes.length === 0) {
    return <div className="page-container"><p>Çöp kutusu boş.</p></div>;
  }

  return (
    <div className="page-container">
      <h2 className="login-title">Çöp Kutusu</h2>
      <div className="note-list">
        {deletedNotes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.text}</p>
            <small>
              Silinme Tarihi:{' '}
              {note.deletedAt?.seconds
                ? new Date(note.deletedAt.seconds * 1000).toLocaleString()
                : 'Bilinmiyor'}
            </small>
            <div className="note-actions">
              <button className="btn restore-btn" onClick={() => handleRestore(note)}>
                Geri Yükle
              </button>
              <button className="btn delete-btn" onClick={() => handlePermanentDelete(note.id)}>
                Kalıcı Sil
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-buttons">
        <button className="btn back-btn" onClick={() => navigate(-1)}>
          Geri Dön
        </button>
      </div>
    </div>
  );
}

export default CopKutusu;

