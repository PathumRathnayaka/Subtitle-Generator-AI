import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import ConvertPage from './pages/ConvertPage';
import TimeSyncPage from './pages/TimeSyncPage';
import Footer from "./pages/Footer.tsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/sync" element={<TimeSyncPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;