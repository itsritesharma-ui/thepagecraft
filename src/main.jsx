import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
=======
import { ContentProvider } from './context/ContentContext.jsx'
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <ContentProvider>
      <App />
    </ContentProvider>
>>>>>>> d46de09 (Deploy CMS ready ThePageCraft)
  </React.StrictMode>
)
