# Ghouldle

A Tokyo Ghoul-themed guessing game inspired by Wordle, where players guess characters based on their attributes.

## Features

- **Daily Mode**: Guess the same daily character as everyone else
- **Infinite Mode**: Unlimited guessing rounds with random characters
- **Smart Feedback System**: Get hints on character attributes:
  - ✅ Correct (green)
  - 🟡 Partial Match (yellow)
  - ❌ Incorrect (gray)
  - ⬆️/⬇️ Rating direction hints
- **Persistent Storage**: Game progress saved in localStorage
- **Responsive Design**: Works on desktop and mobile
- **Share Results**: Copy game results to clipboard

## Character Attributes

Players guess by matching these 9 attributes:

- **Name** - Character's name
- **Species** - Ghoul, Humano, Meio-Ghoul, Quinx
- **Kagune** - Rinkaku, Ukaku, Bikaku, Koukaku
- **Faction** - CCG, Aogiri, Gourmet, Clowns, V, Independente
- **Rating** - Combat power ranking (C to SSS)
- **Gender** - Character's gender
- **Status** - Vivo/Viva, Morto/Morta, Desaparecido
- **Arc** - Original, :re, Jack
- **Role** - Protagonista, Antagonista, Aliado, Neutro

## Tech Stack

- **Framework**: Next.js 16.2.7 with React 19
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Language**: TypeScript 5
- **Animation**: Framer Motion
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
ghouldle/
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main game page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── GameClient.tsx   # Main game component
│   ├── GuessGrid.tsx    # Guesses display
│   ├── GuessCell.tsx    # Individual guess cell
│   ├── Header.tsx       # Navigation header
│   ├── SearchInput.tsx  # Character search
│   ├── HowToPlay.tsx    # Rules modal
│   ├── ShareModal.tsx   # Share results
│   ├── ColorLegend.tsx  # Feedback color guide
│   └── ColumnHeaders.tsx # Grid column headers
├── lib/                 # Utility functions
│   └── game.ts          # Game logic (compareGuess, getDailyCharacter)
├── store/               # Zustand store
│   └── gameStore.ts     # Game state management
├── types/               # TypeScript types
│   └── index.ts         # Type definitions
├── public/              # Static assets
│   └── characters.json  # Tokyo Ghoul characters database
└── README.md            # This file
```

## How to Play

1. **Select a character** from the search input
2. **Submit your guess** to see how close you are
3. **Use the feedback** to narrow down the possibilities
4. **Win** by guessing the correct character

### Daily Mode

- New character every day at UTC 00:00
- Compare your score with others
- Share your results

### Infinite Mode

- Play as many rounds as you want
- New character for each round
- No daily reset

## Environment Setup

For WSL/Linux users with Tailwind CSS, the optional dependency may be required:

```bash
npm install lightningcss-linux-x64-gnu
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Data

Characters are stored in `public/characters.json` with complete information from Tokyo Ghoul series including:
- Multiple arcs (Original, :re)
- Detailed character attributes
- Over 50 playable characters

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- ~3s production build time
- ~860KB optimized output
- TypeScript type-safe
- Zero runtime dependencies for game logic

## License

Created as a fan project for Tokyo Ghoul.

## Contributing

Feel free to submit issues and enhancement requests.
