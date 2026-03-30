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

## GitHub Deployment Checklist
To make the app work on your link:
1. **Build the app:** Run `npm run build`.
2. **The `dist` folder:** After building, a folder named `dist` is created.
3. **Upload `dist` contents:** You must upload the **contents** of the `dist` folder to your GitHub repository.
4. **Base Path:** I have already set the base path to `/AnkitstudyPoint-app-2/` in `vite.config.ts`. Ensure your repository name matches this exactly.

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
