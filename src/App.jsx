import './App.css'
import { Routes, Route } from 'react-router'
import { Home } from './pages/Home/Home'
import { WatchlistProvider } from './contexts/WatchlistProvider'
import { TrailerProvider } from './contexts/Trailer/TrailerProvider'

function App() {

  return (
    <TrailerProvider>
      <WatchlistProvider>
        <Routes>
          <Route path='/' element={ <Home /> } />
        </Routes>
      </WatchlistProvider>
    </TrailerProvider>
  )
}

export default App
