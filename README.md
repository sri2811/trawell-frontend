# Trawell — AI Travel Companion (Frontend)

"Travel Smarter. Worry Less."

React + Vite + Tailwind frontend implementing the Trawell / Volt UI spec:
Login/Register → Home (drawer profile, notification bell, 9 feature icons) →
Plan a Trip, Explore, Expenses (Budget Guardian dotted tracker), Track,
Smart Booking (full multi-step flow), Emergency, Travel Memo, Delay & Replan,
Weather Analysis.

## Run locally in VS Code

1. Open this folder in VS Code.
2. Open a terminal and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL — usually **http://localhost:5173**

## Project structure

```
trawell/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
└─ src/
   ├─ main.jsx              # app entry, router + context providers
   ├─ App.jsx                # route definitions
   ├─ index.css              # tailwind + animations
   ├─ context/
   │  └─ AppContext.jsx      # user/auth, trips, expenses, notifications (localStorage)
   ├─ components/
   │  ├─ TopNav.jsx          # top bar: bell + profile icon
   │  ├─ ProfileDrawer.jsx   # right-side sliding account drawer
   │  ├─ NotificationPanel.jsx
   │  ├─ FeatureCard.jsx     # home-screen icon tile
   │  └─ BudgetTracker.jsx   # dynamic vertical dotted budget tracker
   └─ pages/
      ├─ Login.jsx           # login / register toggle
      ├─ Home.jsx            # hero image + 9 feature icons
      ├─ PlanTrip.jsx        # destination search + preference capsules
      ├─ Explore.jsx         # trip logistics form (dates, travelers, purpose)
      ├─ Expenses.jsx        # trip budget history + expense memo + bill upload
      ├─ Track.jsx           # delay-monitoring toggle options
      ├─ Bookings.jsx        # Smart Booking Agent full flow (12 screens as one state machine)
      ├─ Emergency.jsx       # emergency contacts + documents
      ├─ Memo.jsx            # visited places dashboard
      ├─ DelayReplan.jsx     # alert + alternatives
      └─ Weather.jsx         # forecast cards
```

## Notes

- State (login, trips, expenses, notifications) persists to `localStorage` so
  it survives refreshes — swap this for real API/Firebase calls when the
  backend is ready.
- "Upload Bill" in Expenses simulates OCR with a prompt — wire it to a real
  OCR/AI endpoint later.
- Icons: [lucide-react](https://lucide.dev). Colors: dark navy (`#0B2545`) +
  aqua (`#00C2CB`) per the brand spec, defined in `tailwind.config.js`.
- Booking platform cards, comparisons and prices are placeholder data —
  replace with live results from your backend agents.
