# FitFlow - Fitness App

A modern fitness tracker app built with React Native & Expo. Track exercises, monitor progress, and stay motivated.

## Features

- 📋 Home screen with exercise grid
- 💪 Exercise detail view
- ➕ Add custom exercises
- ✅ Track completed workouts
- 📊 Fitness statistics dashboard
- 💡 Motivational quotes
- 🔍 Search exercises
- 🎨 Modern UI with animations

## Installation

```powershell
npm install
npx expo start -c
```

Scan QR code with Expo Go app on your phone.

## Project Structure

```
app/
├── _layout.tsx       # Context & router setup
├── index.tsx         # Home screen
├── detail.tsx        # Exercise details
├── add.tsx           # Add exercise form
├── completed.tsx     # Completed exercises
├── stats.tsx         # Statistics
├── quotes.tsx        # Motivational quotes
└── splash.tsx        # Splash screen
```

## Available Exercises

1. Push Ups
2. Squats
3. Plank
4. Lunges
5. Burpees
6. Jumping Jacks

## Tech Stack

- React Native
- Expo & Expo Router
- TypeScript
- AsyncStorage (optional)

## Commands

```powershell
npm start          # Start dev server
npm run android    # Build for Android
npm run ios        # Build for iOS
npm run web        # Build for web
npm run lint       # Run linter
```

## Generate Logos (Optional)

```powershell
python scripts/generate-logo.py
# or
npm install sharp && node scripts/generate-logo.js
```

## Submission

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Fitness app"
   git branch -M main
   git remote add origin YOUR-REPO-URL
   git push -u origin main
   ```

2. **Create zip:**
   ```powershell
   Compress-Archive -Path * -DestinationPath ../fitness-app.zip -Exclude "node_modules"
   ```

3. **Submit on Google Classroom** with GitHub link

## Troubleshooting

```powershell
npx expo start -c        # Clear cache
npm install              # Reinstall deps
watchman watch-del-all   # Clear watchman
```

## Requirements ✅

- ✅ Home, Detail, Add, Completed screens
- ✅ Stats & Quotes features
- ✅ Modern UI/UX
- ✅ Search functionality
- ✅ 6 sample exercises
- ✅ Ready for GitHub & classroom submission

---

**Built with React Native & Expo | December 2025**
