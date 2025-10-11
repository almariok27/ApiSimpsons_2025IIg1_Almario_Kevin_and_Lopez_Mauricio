import './App.css';
import Header from './components/Header/Header';
import CharactersPage from './pages/PageCharacters/PageCharacters';
import CharactersInfo from './pages/CharacterInfo/CharacterInfoPage';
import Episodes from './pages/Episodes/EpisodesPage';
import Locations from './pages/Locations/LocationsPage';
import Inicio from './pages/Inicio/InicioPage';
import Nosotros from './pages/Nosotros/NosotrosPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import FondoPages from './assets/fondonubes.jpg';

function App() {
  return (
    <div className="app-root"
      style={{ backgroundImage: `url(${FondoPages})` }}>


      <Router basename={import.meta.env.BASE_URL}>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Inicio />
              <Nosotros />
            </>
          } />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/location" element={<Locations />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/characters/:id" element={<CharactersInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
