import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../style.css'

// Set CSS variable for base path to fix background image URL
const baseUrl = import.meta.env.BASE_URL || '/'
const imagePath = baseUrl.endsWith('/') 
  ? `${baseUrl}jonathan-petersson-ARU18GpF6QQ-unsplash.jpg`
  : `${baseUrl}/jonathan-petersson-ARU18GpF6QQ-unsplash.jpg`
document.documentElement.style.setProperty('--bg-image-url', `url('${imagePath}')`)

// Error handling for root element
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Error rendering app:', error)
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; color: red;">
      <h1>Error Loading Application</h1>
      <p>${error.message}</p>
      <p>Please check the browser console for more details.</p>
    </div>
  `
}

