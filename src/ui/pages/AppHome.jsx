import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppHome() {
    const [directoryChosen, setDirectoryChosen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkStoredDirectory = async () => {
            const storedDirectoryPath = await window.api.getDirectoryOffers();
            if (storedDirectoryPath) {
                setDirectoryChosen(true);
            }
        };

        checkStoredDirectory();
    }, []);

    async function chooseDirectory() {
        const directoryPath = await window.api.directoryOffers();
        if (directoryPath) {
            setDirectoryChosen(true);
        }
    }

    async function resetDirectory() {
        await window.api.resetDirectoryOffers();
        setDirectoryChosen(false);
    }

    function goToOffers() {
        navigate('/offer');
    }

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl"> Trakap </h1>
                    {!directoryChosen ? (
                        <>
                            <p className="mt-4 sm:text-xl/relaxed">
                                Avant toute chose, afin de pouvoir convenablement utiliser Trakap, nous avons besoin de savoir où vous souhaitez stocker vos candidatures 😊
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <button className="btn btn-primary" onClick={chooseDirectory}>
                                    Choisir mon répertoire
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="mt-4 sm:text-xl/relaxed">
                                Vous avez sélectionné un répertoire, vous pouvez donc maintenant utiliser Trakap 🎉
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <button className="btn btn-primary" onClick={goToOffers}>
                                    Voir les offres
                                </button>
                                <button className="btn btn-secondary" onClick={resetDirectory}>
                                    Réinitialiser le répertoire
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}