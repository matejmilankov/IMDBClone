import './App.css';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home/Home';
import { WatchlistProvider } from './contexts/Watchlist/WatchlistProvider';
import { TrailerProvider } from './contexts/Trailer/TrailerProvider';
import { RateProvider } from './contexts/Rate/RateProvider';

function App() {

  return (
    <RateProvider>
      <TrailerProvider>
        <WatchlistProvider>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </WatchlistProvider>
      </TrailerProvider>
    </RateProvider>
  )
}

export default App
