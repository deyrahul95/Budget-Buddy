<p align="center">
   <a href="https://github.com/deyrahul95/Budget-Buddy">
      <img src="assets/images/icon.png" width="250" />
   </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-000?logo=expo" />
  <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript" />
  <a href="https://github.com/deyrahul95/Budget-Buddy/issues">
    <img src="https://img.shields.io/github/issues/deyrahul95/Budget-Buddy" />
  </a>
  <a href="https://github.com/deyrahul95/Budget-Buddy/pulls">
    <img src="https://img.shields.io/github/issues-pr/deyrahul95/Budget-Buddy" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/deyrahul95/Budget-Buddy" />
  </a>
</p>

# Budget Buddy Expense Tracker Mobile Application 👋

## 🚀 Overview

Effortlessly track your income and expenses right from your smartphone, all while ensuring your data remains secure. With an intuitive and visually appealing user interface, you can easily add expenses at any time throughout the day. All your data is stored locally on your device, so you don’t need to worry about internet access or a laptop. Whether you want to monitor your expenses for the current month or for the year, Budget Buddy lets you plan accordingly.

<!-- ## 📸 Screenshots

<img src="docs/screen1.png" width="250" /> -->

## ✨ Features

- Cross-platform (iOS, Android) [Coming Soon]
- Offline-first with SQLite
- Fast startup using Expo Router
- Clean architecture & modular components

## 🛠 Tech Stack

- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo-Sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [SQLite](https://sqlite.org/index.html)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/download)
- [BUN](https://bun.sh/)

## ⚙️ Getting Started

### Prerequires

- [NodeJS](https://nodejs.org/en/download) >= version 20
- [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/go)

### Local Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/deyrahul95/Budget-Buddy.git
   cd Budget-Buddy
   ```

2. Install dependencies

   ```bash
   bun install
   ```

3. Start the app

   ```bash
   bun start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

<!-- ## 🔐 Environment Variables

Create a `.env` file:

```txt
EXPO_PUBLIC_API_URL=...
``` -->

## 🗂 Project Structure

```md
src/
├─ app/
├─ components/
├─ config/
├─ helpers/
└─ assets/
```

## 🗄 Database

- SQLite initialized on app startup
- Schema created programmatically
- Supports future migrations

## 🤝 Contributing

- Fork the repo
- Create a feature branch
- Open a PR with a clear description

## 🗺 Roadmap

- [x] Database migrations
- [ ] Add confirmation on long press the transaction card for deleting transaction
- [ ] Add category emoji and color into database and fetch it from their rather than depend on constants.
- [ ] Dark mode
- [ ] E2E tests

## 📄 License

MIT
