
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { router } from './router.tsx'

// Initialize the router before rendering
await router.initialize();

createRoot(document.getElementById("root")!).render(<App />);
