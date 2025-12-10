
# 📒 Not Defteri Uygulaması (AI Destekli)

Bu proje, kullanıcıların notlarını kolayca oluşturabildiği, düzenleyebildiği, silebildiği ve çöp kutusundan geri yükleyebildiği bir **React + Firebase** not uygulamasıdır.
Ek olarak uygulama, yazılan not içeriğini analiz ederek **otomatik başlık önerisi** sunan bir **yapay zekâ özelliği** içerir.

---

## 🚀 Kullanılan Teknolojiler

### **Frontend**

* React.js
* React Router
* Context API
* CSS ile stil yönetimi

### **Backend & Database**

* Firebase Authentication
* Firebase Firestore

### **Yapay Zekâ**

Uygulamadaki otomatik başlık önerisi, **Mistral AI – Mistral Nemo** modeli kullanılarak oluşturulmuştur.
Yapay zekâ istekleri **OpenRouter API** üzerinden yapılır.

**Kullanılan Model:**

```txt
Mistral AI – Mistral Nemo
model: "mistralai/mistral-nemo"
```

---

## 📌 Özellikler

### ✏️ Not Yönetimi

* Yeni not oluşturma
* Notları listeleme
* Not düzenleme
* Not silme
* Silinenleri **çöp kutusuna taşıma**
* Çöp kutusundan geri yükleme veya tamamen silme

### 🤖 Yapay Zekâ Başlık Önerisi

* Yazdığınız not metnini analiz eder
* İçeriğe en uygun başlığı otomatik önerir
* Kullanıcı isterse öneriyi direkt kullanabilir

---

## 🗂️ Proje Yapısı

```
src/
├── pages/
│   ├── Notlar/
│   ├── NotEkle/
│   ├── NotDuzenle/
│   ├── NotDetay/
│   ├── CopKutusu/
│   └── Auth/
├── firebase/
│   └── firebase.js
├── App.js
└── index.js
```

---

## 🔥 Firebase Yapılandırması

`src/firebase/firebase.js` içerisinde Firebase ayarları bulunur.
Projeyi çalıştırmak isteyenlerin kendi Firebase yapılandırmasını eklemesi gerekir.

---

## 🤖 Yapay Zekâ API Kullanımı

Başlık önerisi istemi örneği:

```js
const completion = await client.responses.create({
  model: "mistralai/mistral-nemo",
  input: `Bu not için bir başlık öner: ${inputValue}`,
});
```

---

## 🛠️ Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/Ayszgn/react-notepad-ai.git
```

### 2. Gerekli paketleri yükleyin

```bash
npm install
```

### 3. Firebase ayarlarını yapın

`firebase.js` içine kendi Firebase config’inizi ekleyin.

### 4. OpenRouter API anahtarını `.env` içine ekleyin

```
REACT_APP_OPENROUTER_API_KEY=your_api_key_here
```

### 5. Projeyi çalıştırın

```bash
npm start
```

---

## 📄 Lisans

Bu proje kişisel kullanım amaçlı oluşturulmuştur.

---

