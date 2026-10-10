# Deepa Lakshmi V — Placement Portfolio Website

A modern, responsive, and recruiter-focused placement portfolio website designed for **DEEPA LAKSHMI V**, Computer Science Engineering student at The Oxford College of Engineering (VTU, graduating 2027).

---

## 📁 Project Folder Location
The complete website is located on your computer at:
```
C:\Users\DEEPA\.gemini\antigravity\scratch\deepa-portfolio\
```

---

## 📂 Directory Structure

```text
deepa-portfolio/
│
├── index.html                  # Main semantic HTML5 webpage structure
├── style.css                   # Navy blue & electric light blue responsive stylesheet
├── script.js                   # Client-side interactions (modal, navigation, clipboard, form)
├── README.md                   # This instruction guide
│
└── assets/
    ├── images/                 # Image assets & screenshot placeholders
    │   ├── profile-placeholder.svg      # Profile photo placeholder (replace with your photo)
    │   ├── dashboard-preview.svg        # IoT Smart Farming Dashboard screenshot
    │   ├── disease-prediction.svg       # Groundnut Disease Prediction AI interface
    │   ├── digital-twin.svg             # Virtual Digital Twin simulation state
    │   └── blockchain-records.svg       # Blockchain ledger & data transparency logs
    │
    └── resume/
        └── deepa-lakshmi-v-resume.pdf   # Resume PDF file for View & Download buttons
```

---

## 🚀 How to Run & Preview Locally on Your Computer

You can preview the website using any of the following methods:

### Method 1: Direct File Opening (Simplest)
1. Open Windows File Explorer and navigate to:
   `C:\Users\DEEPA\.gemini\antigravity\scratch\deepa-portfolio\`
2. Double-click `index.html` (it will open directly in Google Chrome, Microsoft Edge, or your default browser).

### Method 2: Using Node.js / NPX (Recommended for Testing HTTP)
Open PowerShell in the project directory and run:
```powershell
npx.cmd serve
```
Then visit the local URL displayed in the terminal (usually `http://localhost:3000`).

---

## ✏️ How to Customize Your Details

Open `index.html` in VS Code or any text editor. Look for the clear `EDIT HERE` comment blocks:

### 1. Profile Picture
- Place your photo (e.g. `my-photo.jpg` or `deepa.png`) into `assets/images/`.
- In `index.html`, find line ~105:
  ```html
  <img src="assets/images/profile-placeholder.svg" alt="Deepa Lakshmi V" ...>
  ```
- Change `src="assets/images/profile-placeholder.svg"` to `src="assets/images/my-photo.jpg"`.

### 2. Resume PDF
- Rename your actual resume PDF to `deepa-lakshmi-v-resume.pdf` and replace the file at:
  `assets/resume/deepa-lakshmi-v-resume.pdf`.
- Both the **"View Resume"** and **"Download Resume"** buttons will automatically open and download your real resume!

### 3. Project Screenshots
Replace the SVG files in `assets/images/` with your actual screenshots:
- `dashboard-preview.svg` → Your IoT Farm Dashboard screenshot.
- `disease-prediction.svg` → Your Disease Prediction screen.
- `digital-twin.svg` → Your Digital Twin interface.
- `blockchain-records.svg` → Your Blockchain Ledger view.

### 4. Contact Links (Email, LinkedIn, GitHub)
In `index.html`, search for `deepalakshmi.v@example.com`, `https://linkedin.com`, and `https://github.com`, and replace them with your actual profiles.

---

## 🌐 How to Host Online for Free with GitHub Pages

Recruiters love a live, shareable URL like `https://deepalakshmi-v.github.io/portfolio/`. Here is how you can publish it in 5 minutes:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **New Repository**.
3. Name it `portfolio` (or `deepalakshmi-portfolio`).
4. Select **Public**, leave other options unchecked, and click **Create repository**.

### Step 2: Push Your Code
Open PowerShell in `C:\Users\DEEPA\.gemini\antigravity\scratch\deepa-portfolio\` and run:
```powershell
git init
git add .
git commit -m "Initial commit of Deepa Lakshmi V placement portfolio"
git branch -M main
git remote add origin https://github.com/<your-github-username>/portfolio.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top right tab).
3. On the left sidebar, click **Pages**.
4. Under **Branch**, select `main` and root folder `/ (root)`, then click **Save**.
5. Within 1-2 minutes, GitHub will display your live published URL:
   `https://<your-github-username>.github.io/portfolio/`

---

## 📋 Features Included for Campus Placements
- **Professional Navy & Light Blue Palette**: Engineered for recruitment review panels.
- **Major Project Dossier Modal**: Comprehensive interactive `<dialog>` breakdown covering Problem Statement, Objectives, Proposed Solution, System Architecture diagram, Algorithms (ViT, CNN, XGBoost, RF, SVM), Contributions, and Screenshots gallery.
- **Recruiter Resume Module**: Instant preview embed and direct download button.
- **Genuine Academic Credentials**: Verified education timeline (Oxford College of Engg. / VTU, Sai Vijaya College 92%, National High School 90%).
- **Interactive Contact Features**: One-click email clipboard copy and recruiter message dispatcher.
