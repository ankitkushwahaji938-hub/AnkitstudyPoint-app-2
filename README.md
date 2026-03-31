# Ankit Study Point Android App

A modern, fast, and mobile-friendly educational application for pharmacy students.

## Features
- **WebView Integration:** Seamlessly browse the [Ankit Study Point](https://ankitstudypoint.blogspot.com/) blog.
- **Pharma Tools:** Access specialized calculators (Medicine Expiry, IV Drip, Tablet Strength, etc.).
- **Study Timer:** Integrated focus timer for students.
- **Quizzes:** Interactive pharmacist exam quizzes.
- **YouTube Integration:** Watch educational content from the @rxvibeak channel.
- **Offline Support:** Graceful handling of connectivity issues.
- **Bookmarks:** Save your favorite study materials locally.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Mobile Wrapper:** Capacitor

## Important: GitHub Pages & Python
- **GitHub Pages does NOT support Python.** It only supports static files (HTML, CSS, JavaScript).
- This app is built using **React (JavaScript)**, which is perfectly supported by GitHub.
- You do **not** need a `service.js` file manually; the build process (`npm run build`) creates a `sw.js` (Service Worker) automatically for the "Install" feature.

## 🚀 GitHub Pages Deployment Guide (Fix for Blank Screen)

If your app is showing a blank screen on GitHub Pages, it's because you are deploying the **source code** instead of the **built files**. 

### 🛠️ Step-by-Step Fix:

1.  **Push the latest code:** Make sure your GitHub repository has all the files, including the `.github/` folder I just created.
2.  **Go to your GitHub Repository Settings:**
    *   Click on **Settings** (the gear icon ⚙️ at the top).
    *   On the left sidebar, click on **Pages**.
3.  **Change the Build and Deployment Source:**
    *   Under **Build and deployment** > **Source**, you will see a dropdown that says "Deploy from a branch".
    *   **CHANGE THIS** to **"GitHub Actions"**. (This is the most important step!)
4.  **Check the Actions Tab:**
    *   Click on the **Actions** tab at the top of your repository.
    *   You will see a workflow named "Deploy to GitHub Pages" running.
    *   Wait for it to turn **Green** (Success).
5.  **Open your site:**
    *   Once the Action is green, go back to the **Pages** settings.
    *   You will see a link like `https://ankitkushwahaji938-hub.github.io/AnkitstudyPoint-app-2/`.
    *   Click it, and your app will load perfectly!

---

### ❓ Why was it blank before?
GitHub Pages cannot run `.tsx` or React files directly. It needs the "built" version (HTML/JS) which is inside the `dist` folder. The **GitHub Action** I set up automatically builds your app and deploys only the correct files for you.

## Why did a "Temple" site open?
The "Sora Templates" site you saw is likely a link or redirect inside your Blogger template. I have added a **"Home Reset" (Rotate icon)** button in the top header. If you ever get lost or a different site opens, just click that button to return to your main blog immediately.

### 2. Prerequisites
- Node.js installed
- Android Studio installed
- Java Development Kit (JDK) 17+

### 3. Setup Project
```bash
# Install dependencies
npm install

# Build the web project
npm run build
```

### 4. Add Android Platform
```bash
# Add the android folder
npx cap add android

# Sync the web code to the android folder
npx cap sync
```

### 5. Build APK in Android Studio
- Open the `android` folder in Android Studio.
- Wait for Gradle to sync.
- Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`.

## YouTube Note
YouTube blocks embedding full channel pages in iframes. The app now includes a direct "Open in YouTube" button for the best user experience.

## Deployment
You can deploy the web version to any static hosting (Netlify, Vercel, Firebase Hosting) or use it as a PWA.

## License
Apache-2.0
