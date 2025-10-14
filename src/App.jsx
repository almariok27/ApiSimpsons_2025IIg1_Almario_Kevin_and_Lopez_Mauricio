import './App.css';
import Header from './components/Header/Header';
import CharactersPage from './pages/PageCharacters/PageCharacters';
import CharactersInfo from './pages/CharacterInfo/CharacterInfoPage';
import Episodes from './pages/Episodes/EpisodesPage';
import Locations from './pages/Locations/LocationsPage';
import Inicio from './pages/Inicio/InicioPage';
import Nosotros from './pages/Nosotros/NosotrosPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL || '/';

  // ✅ Manejar redirección si viene desde 404.html en GitHub Pages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);

  return (
    <div
      className="app-root"
      style={{
        backgroundImage: `url(${baseUrl}img/fondonubes.jpg)`,
      }}
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Inicio />
              <Nosotros />
            </>
          }
        />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/characters/:id" element={<CharactersInfo />} />
      </Routes>
    </div>
  );
}

function App() {
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <Router basename={baseUrl}>
      <AppContent />
    </Router>
  );
}

export default App;