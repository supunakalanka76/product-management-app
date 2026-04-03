# Product Management App (Prodify)

## 🚀 Overview

This is a modern **Product Management Application (Prodify)** built using **Next.js and Tailwind CSS**. The application allows users to manage products efficiently by performing CRUD operations (Create, Read, Update, Delete) with additional features like search, image upload, and dark mode.

The app is fully client-side and uses **browser localStorage** for data persistence, making it lightweight and easy to run without a backend.

---

## ✨ Features

### Core Features
- ➕ Add new products
- 📋 View all products
- ✏️ Edit existing products
- 🗑️ Delete products (with confirmation)
- 🔍 Search products (by name and description)

### Image Handling
- 🌐 Add image via URL
- 📂 Upload image using file picker
- 🖱️ Drag & drop image upload
- 🖼️ Image preview support

### Data Persistence
- 💾 Data stored in browser **localStorage**
- 🔄 Data persists after page refresh

### UI & UX
- 🎨 Clean and responsive UI
- 🔔 Toast notifications for actions
- ⚡ Smooth interactions and transitions
- 📊 Product statistics (total, filtered, mode)

### Validation
- ✅ Required fields validation
- ✅ Price validation (positive number)
- ✅ Duplicate product prevention
- ✅ Image size limit (for uploads)
- ✅ Input trimming and length checks

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Notifications:** react-hot-toast
- **State Management:** React Hooks
- **Storage:** Browser localStorage

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-management-app.git
cd prodify
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open in browser
```bash
http://localhost:3000
```

---

## 📌 Assumptions
- No backend or database is required for this assignment
- All product data is stored in localStorage
- Images uploaded are stored as base64 strings
- The app is intended for single-user usage
- No authentication or authorization is implemented

---

## 🔧 Improvements (Future Enhancements)
- 🗂️ Category and filtering system
- ☁️ Backend integration (MongoDB / PostgreSQL)
- 🔐 Authentication & user accounts
- 📦 Image upload to cloud (Cloudinary / Firebase)
- 📤 Export / Import product data (JSON)
- 📊 Advanced analytics dashboard
- 🧪 Unit and integration testing
- 🌍 Multi-language support (i18n)

---

## 🤝 Contribution

Contributions are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by Supun Akalanka**

[![GitHub](https://img.shields.io/badge/GitHub-supunakalanka76-181717?style=flat&logo=github)](https://github.com/supunakalanka76)

---
