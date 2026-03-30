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

## How to Build the APK

### 1. Prerequisites
- Node.js installed
- Android Studio installed
- Java Development Kit (JDK) 17+

### 2. Setup Project
```bash
npm install
npm run build
```

### 3. Add Android Platform
```bash
npx cap add android
```

### 4. Sync Project
```bash
npx cap sync
```

### 5. Build APK
- Open the `android` folder in Android Studio.
- Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Deployment
You can deploy the web version to any static hosting (Netlify, Vercel, Firebase Hosting) or use it as a PWA.

## License
Apache-2.0
