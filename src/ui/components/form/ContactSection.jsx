import React from 'react';
import { FEELING_TYPES } from '../../../utils/config';

const ContactSection = ({ offer, handleInputChange, isView }) => {
    return (
      <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
          <div className="space-y-2">
              <label>Nom du contact :</label>
              <input
                type="text"
                name="contactName"
                value={offer.contactName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Email du contact :</label>
              <input
                type="email"
                name="contactEmail"
                value={offer.contactEmail}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Téléphone du contact :</label>
              <input
                type="tel"
                name="contactPhone"
                value={offer.contactPhone}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Feeling :</label>
              <select
                name="feelingType"
                value={offer.feelingType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                disabled={isView}
              >
                {FEELING_TYPES.map((feeling) => (
                  <option key={feeling.value} value={feeling.value}>
                    {feeling.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
    );
  };
  
  export default ContactSection;
  