import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../style.css'

// Set CSS variable for base path to fix background image URL
document.documentElement.style.setProperty(
  '--bg-image-url',
  `url('${import.meta.env.BASE_URL}jonathan-petersson-ARU18GpF6QQ-unsplash.jpg')`
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

