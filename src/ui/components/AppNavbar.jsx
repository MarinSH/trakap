import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AppNavbar() {
    const location = useLocation();

    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    <Link to="/">Trakap</Link>
                </h1>
                <div className="space-x-4">
                    {location.pathname !== '/offer' && (
                        <Link to="/offer" className="btn btn-base-400">
                            Voir les offres
                        </Link>
                    )}
                    {location.pathname !== '/calendar' && (
                        <Link to="/calendar" className="btn btn-base-400">
                            Voir le calendrier
                        </Link>
                    )}
                    {location.pathname !== '/offer/new' && (
                        <Link to="/offer/new" className="btn bg-gradient-to-r from-primary-500 to-secondary-500">
                            Ajouter une offre
                        </Link>
                    )}
                </div>
                </div>
            </div>
        </nav>
    );
}
