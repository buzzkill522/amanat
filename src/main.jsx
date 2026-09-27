import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Fonts are bundled from node_modules, never fetched from a CDN, so no font
// request reaches a third party. (The placeholder lesson videos still do -
// see `teachers.privacy.text`.) Each file carries a
// `unicode-range` per script, so a reader in English never downloads the
// Devanagari and a reader in Hindi never downloads the Vietnamese.
import './fonts.css'
// Nunito for headings, replacing Poppins. Unlike the faces before it this one
// has no Devanagari at all, so the stack in tailwind.config.js puts Mukta
// directly behind it: English headings take Nunito, Hindi headings fall
// through to Mukta rather than to whatever the OS would have picked.

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
