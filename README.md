# Sketch Attitude — React + Supabase

Learn expressive character drawing, one day at a time.

## Tech Stack

- **React 18** + **Vite** — frontend
- **React Router v6** — client-side routing
- **Supabase** — auth (email + Google) + Postgres database
- **Deployed on Vercel or Netlify** — free tier

---

## Local Setup

### 1. Clone / download the project

```bash
cd sketch-attitude
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New project**
3. Note your **Project URL** and **anon public key** from Settings → API

### 3. Run the database migration

In your Supabase project, open **SQL Editor** and run:

```sql
-- User progress table
create table user_progress (
  id             uuid default gen_random_uuid() primary key,
  user_id        uuid references auth.users(id) on delete cascade unique,
  completed_days integer[] default '{}',
  completed_principles integer[] default '{}',
  streak         integer default 0,
  total_minutes  integer default 0,
  updated_at     timestamptz default now()
);

-- Row Level Security — users can only access their own data
alter table user_progress enable row level security;

create policy "Users can manage own progress"
  on user_progress for all
  using (auth.uid() = user_id);

-- Character concepts table (optional — for saving studio creations)
create table character_concepts (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  name        text,
  archetype   text,
  pose        text,
  clothing    text,
  expression  text,
  notes       text,
  created_at  timestamptz default now()
);

alter table character_concepts enable row level security;

create policy "Users can manage own characters"
  on character_concepts for all
  using (auth.uid() = user_id);
```

### 4. Enable Google OAuth (optional)

In Supabase: **Authentication → Providers → Google**

You need a Google OAuth Client ID and Secret from
[console.cloud.google.com](https://console.cloud.google.com).
Add `https://your-project-id.supabase.co/auth/v1/callback` as an authorized redirect URI.

### 5. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
sketch-attitude/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + auth guard
    ├── index.css             # Global styles (light paper theme)
    ├── lib/
    │   └── supabase.js       # Supabase client singleton
    ├── hooks/
    │   ├── useAuth.js        # Auth state + signIn/signUp/signOut
    │   └── useProgress.js    # Per-user progress (reads/writes Supabase)
    ├── data/
    │   └── content.js        # All app content (principles, phases, etc.)
    ├── components/
    │   └── BottomNav.jsx     # Mobile bottom navigation
    └── pages/
        ├── AuthPage.jsx      # Login + signup
        ├── HomePage.jsx      # Dashboard
        ├── TrainPage.jsx     # 30-day program
        ├── PrinciplesPage.jsx
        └── OtherPages.jsx    # Timer, FaceLab, Studio, Progress, Inspo
```

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under
**Project → Settings → Environment Variables**.

Or deploy to **Netlify**:
1. `npm run build` — produces `dist/` folder
2. Drag `dist/` to [netlify.com/drop](https://netlify.com/drop)
3. Add env vars in Site settings → Environment variables

---

## What to build next

| Feature | How |
|---|---|
| Save character cards to DB | Add `useCharacters` hook, write to `character_concepts` table |
| Streak auto-calculation | Supabase Edge Function that runs nightly, checks `updated_at` |
| Push notifications / reminders | Supabase Edge Functions + web push API |
| Upload sketch photos | Supabase Storage bucket, add upload button to day modal |
| Admin dashboard | Separate `/admin` route behind role check |
| Paid tier | Stripe + Supabase webhook to set `is_pro` flag on user |
