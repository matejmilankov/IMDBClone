import './App.css'
import { Routes, Route } from 'react-router'
import { Home } from './pages/Home/Home'
import { WatchlistProvider } from './contexts/WatchlistProvider'

function App() {

  return (
    <WatchlistProvider>
      <Routes>
        <Route path='/' element={ <Home /> } />
      </Routes>
    </WatchlistProvider>
  )
}

export default App
