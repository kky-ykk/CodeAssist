# 🚀 CodeAssist

## 📌 Overview
A Chrome extension that provides helpful hints for LeetCode problems using Google's Gemini AI API. Users can select hint levels (Level-1, Level-2, Level-3) by hovering over the **"💡 Get Hint!"** button.

## 🛠️ Technologies Used
- **JavaScript** (Vanilla JS for extension logic)
- **Chrome Extensions API** (Messaging, Storage, Runtime)
- **HTML & CSS** (For UI styling)
- **Google Gemini AI API** (For generating problem hints)

## 📜 Features
- **Detects LeetCode problems automatically** from the current page.
- **Displays a "💡 Get Hint!" button**, which reveals level options on hover.
- **Fetches AI-generated hints** based on the selected level.
- **Stores hints locally** using Chrome's storage API.

## ⚙️ Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/leetcode-hint-extension.git
   ```
2. Open **Chrome** and go to `chrome://extensions/`
3. Enable **Developer Mode** (top right corner)
4. Click **Load unpacked** and select the project folder.
5. Open any LeetCode problem page and use the extension.

## 🔄 How It Works
1. **Content Script** extracts the problem title and description.
2. Sends data to the **background script**.
3. **Background script** fetches hints from the **Gemini AI API**.
4. Displays hints dynamically on the page.

## 🖥️ Code Structure
### 📂 `manifest.json`
Defines the extension's permissions, scripts, and background services.

### 📂 `background.js`
- Listens for messages from the content script.
- Fetches hints using the Gemini AI API.
- Stores retrieved hints in Chrome local storage.

### 📂 `content.js`
- Extracts problem details from the LeetCode page.
- Injects the "Get Hint" button dynamically.
- Sends requests to the background script.
- Displays hints on the page.

### 📂 `popup.html` & `popup.js`
- Provides a simple UI for interacting with stored hints.

## 🔑 API Used
- [Google Gemini AI API](https://ai.google.dev/) (for generating hints)

## 📷 Demo Screenshot
(Include a screenshot of the extension in action)

## 📜 License
This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!**

