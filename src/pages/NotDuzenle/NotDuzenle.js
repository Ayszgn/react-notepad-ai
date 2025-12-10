import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';//firestore belge işlemleri
import { db } from '../../firebase/firebase';
import './NotDuzenle.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NotDuzenle() {
  const { id } = useParams(); //URLden alınan notun benzersiz ID'si
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => { //notu firestoredan çekmek için kullanılan fonksiyon
      try {  //try catch hata yakalama mekanizması
        const noteRef = doc(db, 'notes', id);
        const noteSnap = await getDoc(noteRef);//belirtilen belge asenkron çekilir noteSnap objesi içeriği taşır.
        if (noteSnap.exists()) {//not firestoreda silinmemişse belgeye gir
          const data = noteSnap.data();//tümveriler data bileşenine alınır.
          setTitle(data.title || '');
          setText(data.text || '');     //data içinde text ve title varsa statelere kaydediyoruz.
        } else {
          setError('Not bulunamadı.');
        }
      } catch (err) {
        console.error('Hata:', err);
        setError('Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, {
        title,
        text,
        updatedAt: new Date()
      });
      navigate(`/not/${id}`, { replace: true });// tarayıcı geçmişinde bu sayfa yeni sayfa olarak değiştirilir 
    } catch (err) {
      console.error('Güncelleme hatası:', err);
      setError('Güncelleme sırasında hata oluştu.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bu notu silmek istediğinizden emin misiniz?');
    if (!confirmDelete) return; //sime onayı gelmezse geri döner

    setError('');
    setDeleting(true);//silme işlemi başladığı için true, işlem olduğu bilinsin diye buton devre dışı
    try {
      const noteRef = doc(db, 'notes', id);
      const noteSnap = await getDoc(noteRef);

      if (!noteSnap.exists()) {
        throw new Error('Silinecek not bulunamadı.');
      }

      const data = noteSnap.data();

      if (!data.uid) {// veri tutarlılığı için uid yoksa hata verir.
        throw new Error('Notun uid bilgisi yok.');
      }

      const deletedRef = doc(db, 'deletedNotes', id);//silinen notlar aynı id ile deletedNotesda tutulur.
      await setDoc(deletedRef, {//deletedNotesa kopyalanır.silinenler yedeklenmiş olur.
        ...data,
        deletedAt: new Date(),
      });

      await deleteDoc(noteRef);//notlar kısmından not silinir.

      alert('Not başarıyla silindi.');
      navigate('/Notlar', { replace: true });
    } catch (err) {
      console.error('Silme hatası:', err);
      setError('Silme sırasında hata oluştu: ' + err.message);
      alert('Silme sırasında hata oluştu: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Yükleniyor...</p>
      </div>
    );
  }

 return (
  <div className="page-container">
    <div className="note-container">
      <button
        className="delete-button"
        onClick={handleDelete}
        disabled={deleting}
        title="Notu sil"
      >
        {deleting ? 'Siliniyor...' : <FontAwesomeIcon icon={faTrash} size="lg" />}
      </button>

      <h2 className="login-title">Notu Düzenle</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="login-input title-input"
          disabled={deleting}
        />
        <textarea
          placeholder="Not içeriği"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"
          className="login-input text-area"
          required
          disabled={deleting}
        />
        <div className="button-group">
          <button
            type="button"
            className="login-button cancel-button"
            onClick={() => navigate(-1)}
            disabled={deleting}
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="login-button"
            disabled={deleting}
          >
            Güncelle
          </button>
        </div>
      </form>

      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  </div>
);

}

export default NotDuzenle;





