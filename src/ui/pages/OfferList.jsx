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

  const handleStatusChange = async (id, newStatus) => {
    const updatedOffer = offers.find(offer => offer.id === id);
    if (updatedOffer) {
      updatedOffer.status = newStatus;
      await window.api.updateOffer(updatedOffer);
      fetchOffers();
    }
  };

  const groupedOffers = offers.reduce((acc, offer) => {
    if (!acc[offer.status]) {
      acc[offer.status] = [];
    }
    acc[offer.status].push(offer);
    return acc;
  }, {});

  const handleDrop = (event, newStatus) => {
    const offerId = event.dataTransfer.getData('offerId');
    handleStatusChange(offerId, newStatus);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Kanban des offres</h1>

        <div className="flex justify-between space-x-4">
          {['OPEN', 'INTERVIEW', 'OFFERED', 'HIRED'].map(status => (
            <div
              key={status}
              className="kanban-column p-4 rounded-lg shadow-md w-1/4 min-h-[200px] bg-white border-2 border-dashed hover:bg-gray-100 transition-colors duration-300"
              onDrop={(event) => handleDrop(event, status)}
              onDragOver={handleDragOver}
            >
              <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">{status}</h2>
              <div className="kanban-cards space-y-4">
                {groupedOffers[status]?.map(offer => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onView={handleViewOffer}
                    onEdit={handleEditOffer}
                    onDelete={deleteOffer}
                    onStatusChange={handleStatusChange}
                    status={status}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
