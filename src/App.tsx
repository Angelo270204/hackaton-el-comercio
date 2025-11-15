import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Navbar } from './shared/components/Navbar'
import { Footer } from './shared/components/Footer'
import { HomePage } from './pages/HomePage'
import { CandidatosPage } from './pages/CandidatosPage'
import Calendario from './pages/Calendario';
import { GuiaMiembrosPage } from './pages/GuiaMiembrosPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="app__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidatos" element={<CandidatosPage />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/guia-miembros" element={<GuiaMiembrosPage />} />
            {/* Agregar más rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App