import React from 'react';
import { OfferForm } from '../components/OfferForm.jsx';

export default function OfferAdd() {
  const handleAddOffer = async (offer) => {
    try {
      await window.api.addOffer(offer);
    } catch (error) {
      console.error('Error when adding offer:', error);
    }
  };

  return (
    <div>
      <h1>Ajouter une nouvelle offre</h1>
      <OfferForm onSubmit={handleAddOffer} isEdit={false} isView={false} />
    </div>
  );
}