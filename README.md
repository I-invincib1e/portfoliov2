# Modern Portfolio Template

![Portfolio Screenshot](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

A modern, responsive, and customizable portfolio template for developers and designers. This template features a clean design with smooth animations, light/dark theme support, and a modular component structure for easy customization.

## Features

- ✨ Modern design with smooth animations
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive for all devices
- 🎨 Easily customizable
- 🚀 Built with React, TypeScript, and styled-components
- 💅 GSAP animations for smooth transitions
- 🧩 Modular component structure
- 🔍 Best practices for performance and accessibility

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or newer)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/portfolio-template.git
cd portfolio-template
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

4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Customization

### Basic Configuration

All major configuration is centralized in the `src/config/siteConfig.ts` file for easy customization:

- **Personal Information**: Update your name, title, email, and location
- **Social Media Links**: Add your own social media profiles
- **Projects**: Customize the projects showcase
- **Technologies**: Add/remove technologies you work with
- **Color Scheme**: Easily change the theme colors

### File Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   ├── config/          # Site configuration
│   │   └── siteConfig.ts  # Central config file
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
└── tailwind.config.js   # Tailwind configuration
```

### Advanced Customization

- **Styling**: Modify the styles in component files (`src/components/*.tsx`)
- **Layout**: Adjust the layout in page files (`src/pages/*.tsx`)
- **Colors**: Update the theme colors in `src/config/siteConfig.ts` and `tailwind.config.js`
- **Fonts**: Change fonts in the `index.html` file and `src/index.css`
- **Animations**: Customize animations in component files or the `src/utils/gsap.ts` file

## Deployment

Build the project for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder, which can be deployed to any static hosting service like:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Styled Components
- GSAP (Animation)
- React Router
- Lucide Icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Stock photos from [Pexels](https://www.pexels.com/)