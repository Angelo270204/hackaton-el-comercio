import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Navbar } from './shared/components/Navbar'
import { Footer } from './shared/components/Footer'
import { ChatBot } from './shared/components/ChatBot'
import { AccessibilityButton } from './shared/components/AccessibilityButton'
import { ScrollToTop } from './shared/components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { CandidatosPage } from './pages/CandidatosPage'
import { GuiaMiembrosPage } from './pages/GuiaMiembrosPage'
import { GuiaDelElectorPage } from './pages/GuiaDelElectorPage'
import { DondeVotar } from './pages/DondeVotar'

function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="app">
            <Navbar />
            <main className="app__content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/candidatos" element={<CandidatosPage />} />
                <Route path="/guia-miembros" element={<GuiaMiembrosPage />} />
                <Route path="/guia-elector" element={<GuiaDelElectorPage />} />
                <Route path="/donde-votar" element={<DondeVotar />} />
                {/* Agregar más rutas aquí */}
              </Routes>
            </main>
            <Footer />
            <AccessibilityButton />
            <ChatBot />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AccessibilityProvider>
  )
}

export default App
