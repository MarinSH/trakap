import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppHome() {
    const [directoryChosen, setDirectoryChosen] = useState(false);
    const [storedDirectoryPath, setStoredDirectoryPath] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkStoredDirectory = async () => {
            try {
                const storedDirectory = await window.api.checkDirectory();
                if (storedDirectory) {
                    setStoredDirectoryPath(storedDirectory);
                    setDirectoryChosen(true);
                } else {
                    setDirectoryChosen(false);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du répertoire :', error);
            }
        };

        checkStoredDirectory();
    }, []);

    async function chooseDirectory() {
        const directoryPath = await window.api.selectDirectory();
        if (directoryPath) {
            setStoredDirectoryPath(directoryPath);
            setDirectoryChosen(true);
        }
    }

    async function resetDirectory() {
        await window.api.resetDirectory();
        const storedDirectory = await window.api.checkDirectory();
        if (storedDirectory) {
            setStoredDirectoryPath(storedDirectory);
            setDirectoryChosen(true);
        } else {
            setDirectoryChosen(false);
        }
    }

    function goToOffers() {
        navigate('/offer');
    }

    return (
        <section>
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
                                Vous avez sélectionné ce répertoire : <strong>{storedDirectoryPath}</strong>, vous pouvez donc maintenant utiliser Trakap 🎉
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <button className="btn btn-primary" onClick={goToOffers}>
                                    Voir mes offres
                                </button>
                                <button className="btn bg-gradient-to-r from-primary-500 to-secondary-500" onClick={resetDirectory}>
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
