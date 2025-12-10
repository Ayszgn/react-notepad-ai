import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import axios from "axios"; //sunucuya istek atmak için
import './NotDetay.css';
function NotDetay() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); //özet penceresi açık mı değil mi

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteRef = doc(db, "notes", id);
        const noteSnap = await getDoc(noteRef);
        if (noteSnap.exists()) {
          setNote(noteSnap.data());
        } else {
          console.log("Not bulunamadı");
        }
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleGenerateSummary = async () => { //özet oluşturan asenkron fonksiyon
    if (!note?.text) return;  //notta metin yoksa dur

    setSummaryLoading(true);
    setSummaryError("");
    setSummary("");
    setIsModalOpen(false); //açık pencere varsa kapatılır.

    try {
      const res = await axios.post("http://localhost:5000/api/generate-summary", { //APIe post isteği atılır. Özetleme servisi
        text: note.text, //istekle birlikte not içeriği sunucuya gönderilir.
      });

      setSummary(res.data.result); //sunucudan dönen veri
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setSummaryError("Özet çıkarılırken hata oluştu.");
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="page-container">
        <p>Not bulunamadı.</p>
      </div>
    );
  }

  return (
  <div className="page-container">
    <div className="note-container">
      <h2 className="login-title">{note.title || "Başlıksız Not"}</h2>
      <p className="note-text">{note.text}</p>

      <div className="button-container">
        <button
          className="login-button"
          onClick={handleGenerateSummary}
          disabled={summaryLoading}
        >
          {summaryLoading ? "Özet çıkarılıyor..." : "Özet Çıkar"}
        </button>

        {summaryError && <p className="error-text">{summaryError}</p>}
      </div>

      <div className="nav-button-group">
        <button
          className="login-button"
          onClick={() => navigate(-1)}
          style={{ marginRight: "10px" }}
        >
          Geri Dön
        </button>

        <button
          className="login-button"
          onClick={() => navigate(`/not-duzenle/${id}`)}
        >
          Düzenle
        </button>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>Oluşturulan Özet</h3>
          <p>{summary}</p>

          <button
            onClick={() => setIsModalOpen(false)}
            className="modal-close-button"
          >
            Kapat
          </button>
        </div>
      </div>
    )}
  </div>
);

}

export default NotDetay;



