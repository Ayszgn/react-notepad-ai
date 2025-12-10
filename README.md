# 📝 Yapay Zekâ Destekli Not Defteri Uygulaması

Bu proje, React tabanlı bir not defteri uygulamasıdır. Kullanıcılar not oluşturabilir, düzenleyebilir, silebilir ve silinen notları Çöp Kutusu’nda görüntüleyebilir.  
Ayrıca uygulama, **not içeriğine göre otomatik başlık öneren** yapay zekâ destekli bir özelliğe sahiptir.

---

## 🚀 Özellikler

- Yeni not ekleme
- Notları düzenleme
- Notları silme ve Çöp Kutusu’na taşıma
- Çöp Kutusu’ndan not geri yükleme veya kalıcı silme
- Otomatik başlık önerme (AI destekli)
- Gerçek zamanlı veri yönetimi (Firebase)
- Temiz ve sade kullanıcı arayüzü

---

## 🛠️ Kullanılan Teknolojiler

- **React**
- **Firebase (Firestore + Authentication))**
- **Node.js**
- **Express (AI backend)**
- **JavaScript**
- **CSS**

---

## 📂 Proje Yapısı (Özet)

```

src/
│── pages/
│── components/
│── firebase/
│── App.js
│── index.js
ai-backend/
│── index.js
│── package.json

```

---

## 🔧 Kurulum

Projenin çalışması için aşağıdaki adımları izleyin:

### 1. Depoyu klonlayın
```

git clone [https://github.com/Ayszgn/react-notepad-ai.git](https://github.com/Ayszgn/react-notepad-ai.git)

```

### 2. Proje klasörüne gidin
```

cd react-notepad-ai

```

### 3. Gerekli paketleri yükleyin
```

npm install

```

### 4. Firebase yapılandırmanızı ekleyin  
`src/firebase/firebase.js` dosyasına kendi Firebase ayarlarınızı ekleyin.

### 5. Projeyi başlatın
```

npm start

```

---

## 🤖 Yapay Zekâ Başlık Önerisi Nasıl Çalışır?

Uygulama, notun içeriğini analiz ederek en uygun başlığı öneren bir AI fonksiyonu kullanır.

- Not içeriği alınıyor.
- Backend tarafında AI modeli başlığı oluşturuyor.
- Kullanıcı isterse öneriyi kabul eder veya düzenler.

---

## 📜 Lisans

Bu proje MIT lisansı ile sunulmuştur.

---

## 👩‍💻 Geliştirici

**Ayşegül Y.**  
Frontend Developer  
GitHub: https://github.com/Ayszgn

