import * as React from 'react';
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import './index.css';
import AppHome from './ui/pages/AppHome.jsx';
import OfferAdd from './ui/pages/OfferAdd.jsx';
import OfferList from './ui/pages/OfferList.jsx';
import OfferEdit from './ui/pages/OfferEdit.jsx';
import OfferView from './ui/pages/OfferView.jsx';
import AppNavbar from './ui/components/AppNavbar.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
    <AppNavbar />
    <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/offer" element={<OfferList />} />
        <Route path="/offer/new" element={<OfferAdd />} />
        <Route path="/offer/edit/:offerId" element={<OfferEdit />} />
        <Route path="/offer/view/:offerId" element={<OfferView />} />
    </Routes>
</HashRouter>
);