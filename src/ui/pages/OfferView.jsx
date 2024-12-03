import React, { useEffect, useState } from 'react';
import { OfferForm } from '../components/OfferForm.jsx';

export default function OfferView({ offerId }) {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const fetchedOffer = await window.api.getOffers();
        setOffer(fetchedOffer.find(offer => offer.id === offerId));
      } catch (error) {
        console.error('Error when retrieving offer:', error);
      }
    };
    fetchOffer();
  }, [offerId]);

  if (!offer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1>Détails de l'offre</h1>
      <OfferForm offerData={offer} isEdit={false} isView={true} />
    </div>
  );
}