import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/OfferCard.jsx';

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    const fetchedOffers = await window.api.getOffers();
    setOffers(fetchedOffers);
  }

  async function deleteOffer(id) {
    await window.api.deleteOffer(id);
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
  }

  const handleViewOffer = (id) => {
    navigate(`/offer/view/${id}`);
  };

  const handleEditOffer = (id) => {
    navigate(`/offer/edit/${id}`);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Liste des offres</h1>
        </div>

        {offers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(offer => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onView={handleViewOffer}
                onEdit={handleEditOffer}
                onDelete={deleteOffer}
              />
            ))}
          </div>
        ) : (
          <p className="text-center mt-12">
            Aucune offre sauvegardée pour le moment 🙁
          </p>
        )}
      </div>
    </section>
  );
}
