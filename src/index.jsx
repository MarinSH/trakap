import * as React from 'react';
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate } from "react-router";
import './index.css';
import AppHome from './ui/pages/AppHome.jsx';
import OfferAdd from './ui/pages/OfferAdd.jsx';
import OfferList from './ui/pages/OfferList.jsx';
import OfferEdit from './ui/pages/OfferEdit.jsx';
import OfferView from './ui/pages/OfferView.jsx';
import AppNavbar from './ui/components/AppNavbar.jsx';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectory = async () => {
      try {
        const directoryPath = await window.api.checkDirectory();
        
        if (!directoryPath) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error when checking directory :', error);
        navigate('/');
      }
    };

    checkDirectory();
  }, [navigate]);

  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/offer" element={<OfferList />} />
        <Route path="/offer/new" element={<OfferAdd />} />
        <Route path="/offer/edit/:offerId" element={<OfferEdit />} />
        <Route path="/offer/view/:offerId" element={<OfferView />} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Index />
  </HashRouter>
);
