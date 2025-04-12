
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { router } from './router.tsx'

// TanStack Router doesn't need explicit initialization before rendering in newer versions
// The RouterProvider component handles this internally

createRoot(document.getElementById("root")!).render(<App />);
