import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.jsx'
import './index.css'

// Static-generate the page to real HTML at build time (so crawlers / link
// previews / AI assistants can read the content without running JS), then
// hydrate the identical interactive React app in the browser.
export const createRoot = ViteReactSSG(<App />)
