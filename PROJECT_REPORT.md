# 📋 Project Report — Nikhil's Portfolio Website

## 1. Project Overview

| Field            | Details                                              |
|------------------|------------------------------------------------------|
| **Project Name** | Nikhil — Personal Portfolio                          |
| **Author**       | Nikhil                                               |
| **Type**         | Single-Page Portfolio Website                        |
| **Purpose**      | Showcase skills, projects, and contact info as a Generative AI Developer |
| **Status**       | ✅ Active Development                                |
| **GitHub**       | [github.com/NB7551498](https://github.com/NB7551498)|
| **Date**         | February 2026                                        |

---

## 2. Technology Stack

| Category           | Technologies                        |
|--------------------|-------------------------------------|
| **Build Tool**     | Vite 7.3.1                          |
| **Language**       | JavaScript (ES Modules)             |
| **3D Graphics**    | Three.js 0.183.1                    |
| **Styling**        | Vanilla CSS (custom design system)  |
| **Typography**     | Google Fonts — Inter, Space Grotesk |
| **Dev Tools**      | TypeScript 5.9.3 (configured)       |

---

## 3. Key Features

### 🎨 Visual & UI
- **Preloader** — Animated loading screen with progress bar and branding
- **Custom cursor glow** — Radial glow that follows the mouse
- **Noise texture overlay** — Subtle film grain for premium feel
- **3D neural network background** — Interactive Three.js scene with nodes, connections, and data signal pulses
- **DNA data helix** — Animated double-helix 3D element
- **Brain sphere** — Layered wireframe icosahedron with ambient particles
- **Scroll-reveal animations** — Elements fade in on scroll via IntersectionObserver
- **Staggered hero animations** — Sequential entrance animations for hero content
- **Back-to-top button** — Appears on scroll with smooth navigation

### 🧠 Interactive Elements
- **Typing effect** — Rotates through roles: Generative AI Developer, LLM Engineer, NLP Specialist, Voice AI Builder, Deep Learning Enthusiast
- **Skill ring animations** — Circular progress rings animate when scrolled into view
- **Counter animations** — Stats count up smoothly (15+ Projects, 3+ Years, 10+ Technologies)
- **Parallax mouse tracking** — 3D scene responds to cursor movement
- **Mobile hamburger menu** — Toggle navigation for smaller screens

### 📄 Sections
1. **Hero** — Name, typing tagline, CTA buttons, scroll indicator
2. **About** — Profile photo, bio, animated stat counters
3. **Skills** — Four skill cards with progress rings and tech tags
   - Generative AI (95%)
   - Deep Learning & NLP (90%)
   - Python & Backend (85%)
   - Voice & Speech AI (80%)
4. **Projects** — Three featured project cards with hover overlays
   - Alpha — AI Voice Assistant
   - GPT-2 from Scratch
   - ANN Churn Predictor
5. **Contact** — Contact form, email, location, social links (GitHub, LinkedIn, Twitter)
6. **Footer** — Branding and copyright

---

## 4. Project Structure

```
Nikhil/
├── public/                     # Static assets
│   ├── profile.webp            # Profile photo
│   ├── project1.webp           # Alpha project screenshot
│   ├── project2.webp           # GPT-2 project screenshot
│   ├── project3.webp           # ANN project screenshot
│   └── vite.svg                # Vite logo
├── src/                        # Default Vite scaffold (unused)
│   ├── counter.ts
│   ├── main.ts
│   ├── style.css
│   └── typescript.svg
├── .gitignore
├── index.html                  # Main HTML (416 lines)
├── main.js                     # JavaScript logic (593 lines)
├── style.css                   # CSS styles (26,695 bytes)
├── package.json                # Dependencies & scripts
├── package-lock.json           # Lock file
└── tsconfig.json               # TypeScript config
```

---

## 5. Dependencies

| Package      | Version   | Purpose                     |
|--------------|-----------|-----------------------------|
| `three`      | ^0.183.1  | 3D graphics & animations   |
| `vite`       | ^7.3.1    | Dev server & build tool     |
| `typescript` | ~5.9.3    | Type checking (dev only)    |

---

## 6. Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Start Vite development server      |
| `npm run build`  | Compile TypeScript & build for production |
| `npm run preview`| Preview the production build       |

---

## 7. 3D Scene Breakdown (Three.js)

The `main.js` file powers an immersive 3D background with these elements:

| Element            | Description                                                    |
|--------------------|----------------------------------------------------------------|
| **Neural Network** | 80 nodes across 5 layers with inter-node connections           |
| **Data Signals**   | 30 animated pulses traveling along connections                 |
| **DNA Helix**      | 60-point double helix with cross-rungs                        |
| **Brain Sphere**   | 3 layered wireframe icosahedrons (r = 6, 4.5, 3)             |
| **Ambient Particles** | Floating particles with custom GLSL shaders               |
| **Mouse Parallax** | Camera responds to cursor position for depth effect           |

---

## 8. Design System

- **Color Palette**: Dark theme with accent gradients (`#6c63ff`, `#00d4aa`, `#8b83ff`)
- **Typography**: Inter (body), Space Grotesk (headings)
- **Layout**: CSS Grid + Flexbox, fully responsive
- **Animations**: CSS transitions + JS-driven IntersectionObserver reveals
- **Effects**: Glassmorphism, noise overlay, cursor glow

---

## 9. Responsive Design

- Fully responsive across desktop, tablet, and mobile
- Mobile hamburger menu for navigation
- Flexible grid layouts that stack on smaller screens
- Touch-friendly interactive elements

---

## 10. Contact Information

| Channel   | Details                                                              |
|-----------|----------------------------------------------------------------------|
| **Email** | nb7551498@gmail.com                                                  |
| **GitHub**| [github.com/NB7551498](https://github.com/NB7551498)                |
| **Location** | India                                                             |

---

> **© 2026 Nikhil. Built with passion & Three.js**
