# UHMC Business Department Kiosk App

An interactive touchscreen kiosk application for the University of Hawaiʻi Maui College Ka Lama Building, designed for a 43-inch portrait display (1080x1920).

**Live Site:** https://lt353.github.io/Agilekioskapp/

## Features

### 🎓 Programs
Browse the four Business Department programs:
- Business
- Hospitality & Tourism
- Accounting
- ABIT (Applied Business & Information Technology)

### 🏢 Building Directory
- Interactive floor maps (Floor 1 & Floor 2)
- Room search by name or browse by floor
- Color-coded room categories
- Detailed room information with maps

### 💼 Jobs & Careers
- Browse current job openings
- Filter by category (Full-time, Part-time, Internship)
- Detailed job descriptions with application instructions

### 🎬 Attract Mode
- Auto-playing slideshow when idle
- Dynamic content from Supabase or static slides
- Touch to activate main menu

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Motion (Framer Motion)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** GitHub Pages
- **Service Worker:** Offline caching for kiosk reliability

## Target Display

- **Resolution:** 1080x1920 (portrait)
- **Aspect Ratio:** 9:16
- **Display:** 43-inch touchscreen
- **Orientation:** Portrait (vertical)

## Setup & Installation

### Prerequisites
- Node.js 20+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/lt353/Agilekioskapp.git
cd Agilekioskapp

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `build/` folder.

## Configuration

### Supabase Database

The app connects to Supabase for dynamic content. Database tables:

- `rooms` - Building directory data
- `job_openings` - Job listings
- `programs` - Program information
- `attract_content` - Slideshow content
- `screen_analytics` - Usage tracking

**Connection:** Configured in `src/data/supabaseClient.ts`

The app gracefully falls back to mock data if Supabase is unavailable.

## Security Notes

### Supabase API Keys

**Why are the keys in the code?**

The Supabase keys in `src/data/supabaseClient.ts` are **meant to be public**:

1. **Anon Key is Public:** The `supabaseAnonKey` is designed to be used in browser/client-side code. It's called "anon" because it's anonymous and public.

2. **Security comes from RLS:** Real security is enforced by **Row Level Security (RLS)** policies on your Supabase database, not by hiding the key.

3. **Client-side apps can't hide secrets:** Since this runs in a browser, any "secret" key would be visible in the bundled JavaScript anyway.

### ✅ Row Level Security (RLS) Configuration

**Status:** RLS is properly configured with policies that allow:
- Anonymous users can **read** active content (rooms, jobs, programs, attract_content)
- Anonymous users can **write** to screen_analytics (usage tracking)
- Only authenticated users can modify data

This ensures the kiosk functions properly while protecting against unauthorized data modification.

### What is .gitignore?

A `.gitignore` file tells Git which files to **ignore** and not upload to GitHub. Common uses:
- Ignore `node_modules/` (dependencies - too big and unnecessary)
- Ignore `.env` files with actual secrets
- Ignore build artifacts

For this project, we've created one that ignores the standard files but **keeps** the Supabase keys public (since they're meant to be).

## Inactivity Behavior

- **Warning:** Shows after 2 minutes of inactivity
- **Auto-return:** Returns to attract mode after 2 minutes 15 seconds
- Ensures kiosk returns to screensaver state when not in use

## Project Structure

```
Agilekioskapp/
├── public/                 # Static assets (service worker)
├── src/
│   ├── assets/            # Images (logos, programs, maps)
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── figma/        # Figma-related utilities
│   │   ├── AttractMode.tsx
│   │   ├── MainMenu.tsx
│   │   └── ...
│   ├── constants/        # Timeout and configuration constants
│   ├── data/             # Data loaders and Supabase client
│   ├── imports/          # Legacy Figma exports (reference only)
│   ├── guidelines/       # Design and setup documentation
│   ├── App.tsx           # Main app router
│   └── main.tsx          # App entry point
├── vite.config.ts        # Vite configuration
├── package.json          # Dependencies
└── README.md            # This file
```

## Development

### Key Files

- `src/App.tsx` - Main routing and view management
- `src/components/MainMenu.tsx` - Home screen with 3 main buttons
- `src/components/AttractMode.tsx` - Screensaver/attract mode
- `src/data/supabaseClient.ts` - Database connection
- `src/data/roomDataLoader.ts` - Directory data loading
- `src/data/jobsDataLoader.ts` - Jobs data loading

### Making Changes

1. Create a new branch: `git checkout -b feature-name`
2. Make your changes
3. Test locally: `npm run dev`
4. Commit: `git commit -m "Description"`
5. Push: `git push origin feature-name`
6. Create pull request on GitHub

## Deployment

The app automatically deploys to GitHub Pages when changes are merged to the `main` branch.

**Deployment URL:** https://lt353.github.io/Agilekioskapp/

## Troubleshooting

### Build fails with "vite not found"
```bash
npm install
```

### Images not loading
- Check that asset names match in `vite.config.ts`
- Ensure images exist in `src/assets/`

### Supabase connection issues
- Check browser console for error messages
- Verify RLS policies aren't blocking access
- App falls back to mock data if connection fails

## Credits

**Course:** ICS 418 - Agile Software Development
**Institution:** University of Hawaiʻi Maui College
**Department:** Business Department, Ka Lama Building
**Team:** LT353

## License

For educational purposes - University of Hawaiʻi Maui College
