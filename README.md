# Acceptopia - React + Vite + Tailwind CSS

A modern, responsive frontend application built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
acc/
├── src/
│   ├── components/
│   │   └── Header.jsx      # Header/Navbar component
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind CSS imports
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 📝 Features

- ✅ Responsive Header/Navbar component
- ✅ Smooth animations with Framer Motion
- ✅ Mobile-first design
- ✅ Dark/Light mode ready
- ✅ Accessible (ARIA labels, focus states)

## 🎨 Customization

The Header component can be customized by editing:
- `src/components/Header.jsx` - Component logic and structure
- `tailwind.config.js` - Theme colors and settings

## 📄 License

MIT
