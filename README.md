# ⚽ Football League Manager - React App

A React-based football league management system that runs entirely in your browser. Built with React and Vite.

## 🚀 How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy).

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## ✨ Features

- ✅ **Teams Management** - Add, view, and delete teams
- ✅ **Player Management** - Add players to teams with stats tracking
- ✅ **Match Scheduling** - Schedule matches between teams
- ✅ **Score Updates** - Enter and update match scores
- ✅ **Match Events** - Track goals, yellow cards, red cards, and goalkeeper saves
- ✅ **League Table** - Automatically calculated standings based on match results
- ✅ **Player Statistics** - Track goals, cards, and saves per player
- ✅ **Top Statistics** - View top scorer, most yellow/red cards, most saves
- ✅ **Data Persistence** - All data saved in browser localStorage
- ✅ **Modern React UI** - Built with React hooks and components

## 📁 Project Structure

```
football-league/
├── src/
│   ├── components/
│   │   ├── TeamsTab.jsx
│   │   ├── TeamModal.jsx
│   │   ├── MatchesTab.jsx
│   │   ├── MatchModal.jsx
│   │   ├── LeagueTableTab.jsx
│   │   └── StatisticsTab.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── style.css
├── package.json
└── vite.config.js
```

## 🎯 How to Use

### Navigation
Use the tabs at the top to navigate between:
- **Teams** - Manage teams and players
- **Matches** - Schedule and update match scores
- **League Table** - View current standings
- **Statistics** - See top performers

### Adding a Team
1. Go to the **Teams** tab
2. Fill in the team name (required) and optional logo URL
3. Click "Add Team"

### Adding Players
1. Click "View Team" on any team
2. Fill in player details (name, age, jersey number, position)
3. Click "Add Player"

### Scheduling a Match
1. Go to the **Matches** tab
2. Select home team, away team, date, and time
3. Click "Schedule Match"

### Updating Match Scores
1. Click "Enter Score" or "Update" on any match
2. Enter final scores
3. Add match events (goals, cards, saves)
4. Click "Update Score"

### Viewing League Table
- Automatically calculated based on completed matches
- Points: Win = 3, Draw = 1, Loss = 0
- Top 3 teams highlighted

### Viewing Statistics
- See top scorer, most yellow/red cards, and most saves
- Statistics update automatically when matches are completed

## 💾 Data Storage

All data is stored in browser localStorage:
- Teams and players: `footballLeagueData`
- Matches: `footballLeagueMatches`

Data persists between browser sessions.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **JavaScript/JSX** - Programming language
- **CSS** - Styling

## 📝 Development

The app uses:
- React Hooks (`useState`, `useEffect`)
- Component-based architecture
- Local state management
- localStorage for persistence

## 🚀 Deployment

Build the app and deploy the `dist` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Any web server

---

**Enjoy managing your football league! ⚽**
