import React from 'react';
import { OfferForm } from '../components/OfferForm.jsx';
import { useLocation } from 'react-router';

export default function OfferAdd() {
  const location = useLocation();
  const offerData = location.state?.offerData || {};

  const handleAddOffer = async (offer) => {
    try {
      await window.api.addOffer(offer);
    } catch (error) {
      console.error('Error when adding offer:', error);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ajouter une nouvelle offre</h1>
        </div>

        <OfferForm offerData={offerData} onSubmit={handleAddOffer} isEdit={false} isView={false} />
      </div>
    </section>
  );
}
