import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './NotEkle.css';

function NotEkle() {
  const [noteText, setNoteText] = useState('');
  const [title, setTitle] = useState('');
  const [loadingTitle, setLoadingTitle] = useState(false); // öneri butonu durumu
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!noteText.trim()) { //trim not boş mu kontrolü
      alert('Not boş olamaz!');
      return;
    }

    try {
      await addDoc(collection(db, "notes"), { //yeni belge ekleniyor kullanıcı uid ve tarih kaydediliyor.
        uid: auth.currentUser.uid,
        title: title || 'Başlıksız Not',
        text: noteText,
        createdAt: serverTimestamp()
      });
      alert('Not kaydedildi!');
      navigate('/Notlar');
    } catch (error) {
      console.error("Not kaydedilemedi:", error);
      alert('Hata oluştu, tekrar deneyin.');
    }
  };

  // Başlık önerisi alma
  const handleTitleSuggest = async () => {
  if (!noteText.trim()) {
    alert("Önce not içeriği yazmalısınız.");
    return;
  }
  setLoadingTitle(true);
  try {
    const res = await fetch("http://localhost:5000/api/generate-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },         //not içeriği varsa backend APIe POST atıyor
      body: JSON.stringify({ text: noteText })
    });
    const data = await res.json();
    console.log("Backend'den gelen veri:", data);  

    if (!data.result) {
      throw new Error(data.error || "Başlık alınamadı.");
    }
    const baslik = data.result.replace('Başlık:', '').trim();
    setTitle(baslik || 'Başlık Önerisi Bulunamadı');
  } catch (err) {
    console.error("Başlık önerisi alınamadı:", err);
    alert("Başlık önerisi alınamadı: " + err.message);
  }
  setLoadingTitle(false);
};



 return (
    <div className="page-container">
      <div className="shining-header">
        <h1 className="project-name">ThinkBoard</h1>
      </div>

      <div className="note-container">
        <h2 className="login-title">Yeni Not Ekle</h2>

        <div className="title-input-group">
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleTitleSuggest}
            disabled={loadingTitle}
            className="title-suggest-button"
          >
            {loadingTitle ? 'Yükleniyor...' : 'Başlık Öner'}
          </button>
        </div>

        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Notunuzu buraya yazın..."
          className="note-textarea"
        />

        <div className="buttons-row">
          <button
            className="login-button"
            onClick={() => navigate(-1)}
          >
            Geri Dön
          </button>

          <button
            className="login-button"
            onClick={handleSave}
          >
            Notu Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotEkle;








