// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';
import AnimeDetailsPage from './pages/AnimeDetailsPage';
import MangaPage from './pages/MangaPage';
import MangaDetailsPage from './pages/MangaDetailsPage';
import NewsList from './NewsList';
import KidsPage from './pages/KidsPage';
import Header from './components/Header';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import CookiesPolicy from "./pages/CookiesPolicy";
import LoginAdult from "./components/LoginAdult";
import LoginMinor from "./components/LoginMinor";
import Register from "./components/Register";

const App = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, { text: newComment, likes: 0 }]);
  };

  const handleLike = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
  };

  return (
    <>
      <Header />

      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/anime/:id" element={<AnimeDetailsPage />} />
        <Route path="/manga" element={<MangaPage />} />
        <Route path="/manga/:id" element={<MangaDetailsPage />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsofService />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/login-adult" element={<LoginAdult />} />
        <Route path="/login-minor" element={<LoginMinor />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
