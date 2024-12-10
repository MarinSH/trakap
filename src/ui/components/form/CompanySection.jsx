import React from 'react';
import { SCHEDULE_TYPES } from '../../../utils/config';

export default function CompanySection({ offer, handleInputChange, isView }) {
    return (
        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Entreprise</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
            <label>Nom de l'entreprise :</label>
            <input
                type="text"
                name="companyName"
                value={offer.companyName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
            />
            </div>
        
            <div className="space-y-2">
            <label>Lien du site de l'entreprise :</label>
            {!isView ? (
                <input
                type="url"
                name="companyLink"
                value={offer.companyLink}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                />
            ) : (
                offer.companyLink && (
                <div className="space-y-2 mt-2">
                    <button
                    type="button"
                    onClick={() => window.open(offer.companyLink, "_blank")}
                    className="btn bg-gradient-to-r from-gray-500 to-gray-700 sm:w-auto"
                    >
                    Voir le site de l'entreprise
                    </button>
                </div>
                )
            )}
            </div>

            <div className="space-y-2">
            <label>Domaine d'activité :</label>
            <input
                type="text"
                name="domain"
                value={offer.domain}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
            />
            </div>

            <div className="space-y-2">
            <label>Horaire :</label>
            <select
                name="scheduleType"
                value={offer.scheduleType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                disabled={isView}
            >
                {SCHEDULE_TYPES.map((schedule) => (
                <option key={schedule.value} value={schedule.value}>
                    {schedule.label}
                </option>
                ))}
            </select>
            </div>

            <div className="space-y-2">
            <label>Temps du trajet :</label>
            <input
                type="text"
                name="commuteTime"
                value={offer.commuteTime}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
            />
            </div>

            <div className="space-y-2">
            <label>Avantages :</label>
            <input
                type="text"
                name="benefits"
                value={offer.benefits}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
            />
            </div>
        </div>
        </section>
    );
};