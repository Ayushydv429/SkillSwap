# SkillSwap AI

SkillSwap AI is a polished student-powered services marketplace. Clients can discover creators across design, coding, video, tutoring, writing, music, and social media, then save profiles, request bookings, and use AI-assisted tools to find the right fit. Creators have a focused dashboard for managing their profile and work.

## Features

- Responsive marketplace with 15 demo creators across 8 categories
- Search creators by name, skill, role, or vibe
- Category filtering, profile previews, save creators, and booking requests
- Light and dark theme toggle
- Client dashboard with booking activity, saved creator count, profile strength, and helpful next steps
- AI Service Description Generator, AI Pricing Suggestion Tool, and AI Creator Matching Assistant demo flows
- Inline landing-page AI Creator Matchmaker visible before marketplace browsing
- Structured pricing assistant inputs for category, experience, and complexity
- Smart search suggestions for creator names and categories
- AI dashboard insights for trends, booking decisions, and personalized next steps
- Dedicated “Why SkillSwap AI?” explanation section
- Creator shortlist and side-by-side comparison for faster hiring decisions
- Creator/client role-ready auth UI and dashboard structure
- Firebase email/password authentication with Client and Creator roles
- Testimonials, feature explainer, footer navigation, and empty states

## Tech stack

- React 18
- Vite
- Lucide React icons
- Firebase Authentication and Firestore
- CSS with responsive media queries and CSS variables
- Google Fonts: DM Sans, DM Mono, Playfair Display

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Deploy publicly

The app is a Vite static site and works without Firebase credentials in demo mode. It can be deployed directly from this folder:

### Vercel

```bash
npx vercel
```

Use the project defaults when prompted. `vercel.json` configures the build and SPA fallback. For live Firebase accounts, add the `VITE_FIREBASE_*` variables in the Vercel project settings before redeploying.

### Netlify

```bash
npx netlify deploy --prod
```

Choose `dist` as the publish directory after running `npm run build`. `netlify.toml` already configures the build command and SPA fallback.

For the quickest no-account option, run `npm run build` and upload the generated `dist/` folder to any static hosting provider.

## Three-minute demo flow

1. Start on the landing page and immediately enter `React MVP under $70/hr` into the inline **AI Creator Matchmaker**.
2. Show the two best-fit creators, match percentages, reasoning, and click one result to create a booking request.
3. Open **AI assistant**, choose **Price my service**, and demonstrate category, experience, complexity, and context-based pricing.
4. Switch to **Write my brief**, enter a service title/category, and copy the generated professional description.
5. Search for `design` or a creator name to show smart suggestions, then open a profile with portfolio, services, languages, and response time.
6. Select two creators, open **Compare now**, and explain the decision-support view.
7. Open the dashboard to show AI insights, trends, seeded bookings, analytics, and saved creators.
8. Use the theme toggle and mobile menu to demonstrate responsive polish.

## Pre-submission notes

- The app is demo-ready without credentials through local fallback data.
- Firebase Auth and Firestore become active when the `VITE_FIREBASE_*` environment variables are configured.
- AI matching, descriptions, and pricing currently use deterministic client-side demo logic; connect them to a protected AI endpoint before production launch.
- The comparison tray and seeded activity are intentionally local demo state so the full story works without backend setup.

## Firebase setup

The app uses Firebase Authentication for email/password accounts and Firestore for user role profiles. Copy `.env.example` to `.env`, then add the web app configuration from your Firebase project:

1. Create a Firebase project and register a web app.
2. Enable Email/Password under Authentication > Sign-in method.
3. Create a Firestore database.
4. Copy the Firebase web config values into the `VITE_FIREBASE_*` variables.
5. Run `npm run dev` and create a Client or Creator account.

Each account stores a profile at `profiles/{uid}` with its selected `role`. Without environment variables, the UI stays in local demo mode so the marketplace can still be previewed.

## Future improvements

- Real-time booking chat and notifications
- Creator onboarding wizard with portfolio uploads
- Payment milestones and escrow
- Reviews after completed bookings
- Availability calendar and timezone-aware scheduling
- Semantic creator matching using embeddings
- Admin moderation and reporting tools
