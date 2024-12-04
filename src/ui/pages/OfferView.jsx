import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OfferForm } from '../components/OfferForm.jsx';

export default function OfferView() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
        try {
            const fetchedOffer = await window.api.getOfferById(offerId);
            setOffer(fetchedOffer);
        } catch (error) {
            console.error('Error when retrieving offer by ID:', error);
        }
    };

    if (offerId) {
        fetchOffer();
    }
  }, [offerId]);

  if (!offer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Détails de l'offre</h1>
        </div>

        <OfferForm offerData={offer} isEdit={false} isView={true} />
      </div>
    </section>
  );
}
