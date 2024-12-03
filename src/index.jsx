import * as React from 'react'
import { HashRouter, Routes, Route } from "react-router"
import { createRoot } from 'react-dom/client'
import HomePage from './ui/pages/HomePage.jsx'
import DashboardPage from './ui/pages/DashboardPage.jsx'
import ProfilePage from './ui/pages/ProfilePage.jsx'
import './index.css'

const root = createRoot(document.body)
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </HashRouter>
)