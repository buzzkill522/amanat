import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Fonts are bundled from node_modules, never fetched from a CDN - the site
// promises that opening it sends nothing to a third party. Each file carries a
// `unicode-range` per script, so a reader in English never downloads the
// Devanagari and a reader in Hindi never downloads the Vietnamese.
import '@fontsource/mukta/400.css'
import '@fontsource/mukta/600.css'
import '@fontsource/mukta/700.css'
import '@fontsource/mukta/800.css'
// Poppins for headings, replacing Anek Devanagari. Also an Indian Type
// Foundry face, and - the part that decides it - it ships a `devanagari`
// subset alongside `latin`, so switching the site to Hindi changes the script
// and not the typeface. A Latin-only display face would have quietly handed
// every Hindi heading to whatever the OS picked, which is a different design
// on half the site.
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
