# 🏗️ BuildGen AI

**AI-Powered Sustainable Design & Generation**

BuildGen AI is a cutting-edge web application that leverages the power of the Google Gemini API to generate sustainable architectural designs, mockups, and layout concepts. Combining a sleek, modern UI with robust local data storage and authentication, this platform offers a premium, free-tier AI generation experience tailored for builders, designers, and visionaries.

---

## 🚀 Key Features

- **AI-Powered Generation:** Seamlessly generate design concepts and layouts using Google's generative AI (Gemini).
- **Responsive & Premium UI:** Built with Tailwind CSS and Radix UI (shadcn/ui) for a responsive, modern, and engaging user experience including dark mode support.
- **Local Data Storage:** Secure, browser-based data storage ensuring your generations and data are accessible immediately.
- **Local Authentication:** Frictionless localized auth logic giving you a personalized workspace.
- **Fast & Lightweight:** Powered by Vite, React, and TypeScript for rapid development and blazingly fast load times.

## 🛠️ Tech Stack

- **Frontend Framework:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini)
- **State Management & Routing:** [React Router](https://reactrouter.com/) + [TanStack Query](https://tanstack.com/query/latest)

## 🏁 Getting Started

### Prerequisites

Make sure you have Node.js and `npm` (or `bun`) installed on your machine.
- Node.js (v18+ recommended)
- API Key from Google AI Studio (for Gemini API)

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd future-home-gen-main
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of your project based on any example `.env` format provided, and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 📜 Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs ESLint to catch formatting or code quality issues.
- `npm run test` - Runs Vitest tests.

## 🤝 Contributing

Contributions are always welcome! Feel free to open issues or submit Pull Requests for bug fixes or features.

## 📄 License

This project is proprietary and intended for BuildGen AI. All rights reserved.
