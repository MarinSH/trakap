import React, { useState } from 'react';
import RemoteWorkSelect from '../RemoteWorkSelect.jsx';
import TechStackSelect from '../TechStackSelect.jsx';
import { CONFIG_TECH_STACK, CONTRACT_TYPES } from '../../../utils/config.js';

export default function OfferSection({ offer, setOffer, handleInputChange, isView }) {
    const [remoteWork, setRemoteWork] = useState(offer.remoteWork); 
    const [techStack, setTechStack] = useState(offer.techStack);  

    const handleRemoteWorkChange = (value) => {
        setRemoteWork(value);
        handleInputChange({ target: { name: 'remoteWork', value } });  
    };
    
    const handleTechStackChange = (newValues) => {
        setTechStack(newValues);
        setOffer(prevState => ({
            ...prevState,
            techStack: newValues,
        }));
    };

    return (
        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Offre</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="space-y-2">
            <label>Date d'envoi :</label>
            <input
            type="date"
            name="sendAt"
            value={offer.sendAt}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Nom de l'offre :</label>
            <input
            type="text"
            name="offerName"
            value={offer.offerName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Lieu :</label>
            <input
            type="text"
            name="location"
            value={offer.location}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Salaire :</label>
            <input
            type="text"
            name="salary"
            value={offer.salary}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Télétravail :</label>
            <RemoteWorkSelect 
            value={remoteWork} 
            onChange={handleRemoteWorkChange} 
            isView={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Technologies utilisées :</label>
            <TechStackSelect 
            value={techStack} 
            onChange={handleTechStackChange} 
            options={CONFIG_TECH_STACK} 
            isView={isView} 
            />
        </div>

        <div className="space-y-2">
            <label>Lien de l'offre :</label>
            {!isView ? (
                <input
                type="url"
                name="offerLink"
                value={offer.offerLink}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                />
            ) : (
                offer.offerLink && (
                <div className="space-y-2 mt-2">
                    <button
                        type="button"
                        onClick={() => window.open(offer.offerLink, "_blank")}
                        className="btn bg-gradient-to-r from-gray-500 to-gray-700 sm:w-auto"
                    >
                    Voir l'offre
                    </button>
                </div>
                )
            )}
        </div>

        <div className="space-y-2">
            <label>Platforme où vous avez trouvé l'offre :</label>
            <input
            type="text"
            name="offerSource"
            value={offer.offerSource}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Expérience demandée :</label>
            <input
            type="text"
            name="experienceRequired"
            value={offer.experienceRequired}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
            />
        </div>

        <div className="space-y-2">
            <label>Type de contrat :</label>
            <select
            name="contractType"
            value={offer.contractType}
            onChange={handleInputChange}
            className="select select-bordered w-full"
            disabled={isView}
            >
            {CONTRACT_TYPES.map((contract) => (
                <option key={contract.value} value={contract.value}>
                    {contract.label}
                </option>
            ))}
            </select>
        </div>

        <div className="space-y-2">
            <label>Date de démarrage souhaitée :</label>
            <input
            type="date"
            name="startDate"
            value={offer.startDate}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
            />
        </div>
    </div>

        <div className="space-y-2">
            <label>Informations fournies lors de la candidature :</label>
            <textarea
            name="applicationInfo"
            value={offer.applicationInfo}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full min-h-64"
            disabled={isView}
            />
        </div>
    </section>
    );
};