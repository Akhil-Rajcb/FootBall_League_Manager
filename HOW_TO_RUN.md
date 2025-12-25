# 🚀 How to Run the React App

Follow these simple steps to get the Football League Manager running:

## Step 1: Install Node.js

If you don't have Node.js installed:
1. Download from [nodejs.org](https://nodejs.org/)
2. Install it (choose LTS version)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Navigate to Project Folder

Open terminal/command prompt and go to the project folder:

```bash
cd football-league
```

## Step 3: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:
- React
- Vite (build tool)
- All other dependencies

Wait for it to complete (may take 1-2 minutes).

## Step 4: Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 5: Open in Browser

Open your web browser and go to:

**http://localhost:5173**

The app should now be running! 🎉

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Error: "npm is not recognized"
- Make sure Node.js is installed
- Restart your terminal after installing Node.js

### Error: "Port 5173 already in use"
- Vite will automatically use the next available port
- Or stop the other process using port 5173

### Error: "Cannot find module"
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

## What You'll See

Once running, you can:
1. **Add Teams** - Create teams with names and logos
2. **Add Players** - Add players to teams
3. **Schedule Matches** - Create matches between teams
4. **Update Scores** - Enter match results and events
5. **View League Table** - See automatic standings
6. **Check Statistics** - View top performers

All data is saved in your browser's localStorage!

---

**Happy Coding! ⚽**

