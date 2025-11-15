import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Navbar } from './shared/components/Navbar'
import { Footer } from './shared/components/Footer'
import { HomePage } from './pages/HomePage'
import Calendario from './pages/Calendario';
import { DondeVotar } from './pages/DondeVotar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="app__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/donde-votar" element={<DondeVotar />} />
            {/* Agregar más rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App