# 🔒 Password Manager Project

![Project Screenshot](./screenshots/password-manager.png) <!-- Add a screenshot of your project here -->

A secure password generation tool that creates unique, platform-specific passwords based on user inputs. Built with **React** and **Tailwind CSS** for a modern and responsive user interface, and powered by a **Node.js + Express** backend for secure password generation.

---

## ✨ Features

- **Platform-Specific Passwords**: Generates unique passwords for each platform (e.g., Facebook, Instagram, LinkedIn).
- **Secure Hashing**: Uses **PBKDF2** with **SHA-256** for secure password generation.
- **Modern UI**: Clean and responsive user interface built with **React** and **Tailwind CSS**.
- **Backend Integration**: Powered by a **Node.js + Express** backend for secure password generation.
- **CORS Support**: Ensures secure communication between the frontend and backend.

---

## 🛠 Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Cryptography**: PBKDF2 (SHA-256)
- **Security**: CORS, Salting

---

## 🚀 How It Works

1. Users input their details (e.g., name, NIC number, birthday, unique word, unique ID).
2. The backend combines these inputs with a platform-specific salt and hashes them using **PBKDF2**.
3. The frontend displays unique, secure passwords for each platform.

---

## 📸 Screenshots

| **Home Page** | **Generated Passwords** |
|---------------|-------------------------|
| ![Home Page](./screenshots/home.png) | ![Generated Passwords](./screenshots/passwords.png) |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/password-manager.git
   cd password-manager
