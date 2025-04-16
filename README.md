# Elevator System

A modern web-based elevator management system for a 10-floor building with 5 elevators. This project implements a sophisticated elevator control system with real-time animations, smart elevator assignment, and an intuitive user interface.

![Elevator System Preview](https://github.com/miketropi/elevator-simulator/blob/master/preview.jpeg?raw=true)


## Features

- 🏢 10-floor building with 5 elevators
- 🎯 Smart elevator assignment algorithm
- 🚀 Smooth elevator movement animations
- 🔔 Sound notifications on arrival
- 🎨 Modern, responsive UI
- ⏱️ Accurate timing system
- 📊 Real-time elevator status tracking

## Technical Stack

- React 19
- Vite
- TailwindCSS
- TypeScript
- ESLint

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd elevators
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── styles/        # CSS and Tailwind styles
└── types/         # TypeScript type definitions
```

## System Requirements

- 10 floors (including ground floor)
- 5 elevators
- Call buttons on each floor
- 2-second pause at destination floor
- Smooth movement between floors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
