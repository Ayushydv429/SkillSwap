# SkillSwap AI Project Map

## App entrypoint

- `index.html` loads `src/App.jsx`.
- `src/App.jsx` mounts the React application.
- `src/main.jsx` contains the current SkillSwap AI application implementation and exports `App`.
- `src/styles.css` contains the responsive visual system.
- `src/firebase.js` contains optional Firebase Auth and Firestore integration.

## Product areas

- Landing page and marketplace: `src/main.jsx`
- AI creator matchmaker: inline hero matchmaker and `AIWorkbench`
- AI pricing assistant: `AIWorkbench` pricing mode
- AI service description generator: `AIWorkbench` description mode
- Creator profiles, comparison, and bookings: `src/main.jsx`
- Client and creator dashboard: `Dashboard` in `src/main.jsx`
- Firebase auth and role profiles: `src/firebase.js`

## Deliberate demo behavior

The app runs without Firebase environment variables using realistic local demo data. Firebase becomes active when the `VITE_FIREBASE_*` values in `.env.example` are configured.

## Run commands

```bash
npm install
npm run dev
npm run build
```

The ZIP intentionally excludes `node_modules/` and `dist/`; these are generated locally and are not needed for code review or ChatGPT analysis.
