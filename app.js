import {useState} from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = event => {
    setQuery(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=kiyXAnFmtKxAmq7eA8kvZ3dEHauyd-KiOiibfJf9skk`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch images')
      }
      const data = await response.json()
      setImages(data.results)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Image Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="image-grid">
        {images.map(image => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
          />
        ))}
      </div>
    </div>
  )
}

export default App
