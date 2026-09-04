import './App.css';
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home/Home';
import { AppProviders } from './contexts/AppProviders';

function App() {

  return (
    <AppProviders>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </AppProviders>
  )
}

export default App
