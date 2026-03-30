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

## How to Build the APK & Use on GitHub

### 1. GitHub Usage
- This is a **React + Capacitor** project.
- To see the live app on GitHub, you must use **GitHub Actions** to deploy to **GitHub Pages**, or simply download the code and run it locally.
- The "App not opening" on GitHub is usually because GitHub doesn't run React code automatically. You need to build it first.

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
