import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/OfferCard.jsx';
import { STATUS_LABELS } from '../../utils/config.js';

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const [collapsedColumns, setCollapsedColumns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    const fetchedOffers = await window.api.getOffers();
    setOffers(fetchedOffers);

    // Initialisation de l'état collapsedColumns en fonction des colonnes vides
    const initialCollapsedState = Object.keys(STATUS_LABELS).reduce((acc, status) => {
      // Si la colonne est vide, elle sera minimisée par défaut
      acc[status] = fetchedOffers.filter(offer => offer.status === status).length === 0;
      return acc;
    }, {});

    setCollapsedColumns(initialCollapsedState);
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

  const toggleCollapse = (status) => {
    setCollapsedColumns(prevState => ({
      ...prevState,
      [status]: !prevState[status], // Change the collapsed state
    }));
  };

  const statusGradients = {
    SENDING: 'bg-gradient-to-r from-primary-500 to-primary-700',
    INTERVIEW: 'bg-gradient-to-r from-secondary-500 to-secondary-700',
    PENDING: 'bg-gradient-to-r from-gray-500 to-gray-700',
    ACCEPTED: 'bg-gradient-to-r from-success-500 to-success-700',
    REJECTED: 'bg-gradient-to-r from-warning-500 to-warning-700',
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Kanban des offres</h1>

        <div className="flex justify-between space-x-4">
          {Object.keys(STATUS_LABELS).map(status => (
            <div
              key={status}
              className={`kanban-column rounded-lg shadow-md ${collapsedColumns[status] ? 'w-24' : 'w-1/4'} flex flex-col border border-gray-600 transition-all duration-200`} 
              onDrop={(event) => handleDrop(event, status)}
              onDragOver={handleDragOver}
            >
              <div className={`p-2 ${statusGradients[status]}  rounded-t-lg flex h-14 items-center justify-between border-b border-gray-600`}>
                <h2 className="text-xl font-semibold pl-4 text-gray-100">
                  {collapsedColumns[status] ? '' : STATUS_LABELS[status]}
                </h2>
                <button
                  onClick={() => toggleCollapse(status)}
                  className="text-gray-100 mr-6"
                >
                  <i className={`fa ${collapsedColumns[status] ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                </button>
              </div>

              <div className="kanban-cards m-4 space-y-4 flex-1">
                {collapsedColumns[status] ? (
                  groupedOffers[status]?.length > 0 && (
                    <p className="text-center text-gray-300">
                      {groupedOffers[status]?.length} <i className="fa-solid fa-folder-open"></i>
                    </p>
                  )
                ) : (
                  groupedOffers[status]?.map(offer => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onView={handleViewOffer}
                      onEdit={handleEditOffer}
                      onStatusChange={handleStatusChange}
                      status={status}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
