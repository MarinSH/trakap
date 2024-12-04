import React from 'react';

export default function OfferCard({ offer, onView, onEdit, onDelete, status }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('offerId', offer.id);
    event.target.style.opacity = 0.5;
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  return (
    <div
      className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 mb-4 bg-gray-700 border border-gray-600"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-100">{offer.offerName}</h3>
          <button
            className="btn btn-secondary text-sm"
            onClick={() => onEdit(offer.id)}
          >
            Modifier
          </button>
        </div>
        <p className="text-gray-200">{offer.companyName}</p>
        <p className="text-sm">{offer.location}</p>
      </div>

      <div className="border-t border-gray-600 p-4 flex justify-between items-center">
        <button
          className="btn btn-primary w-1/3 text-sm"
          onClick={() => onView(offer.id)}
        >
          Voir
        </button>
        <button
          className="btn btn-secondary w-1/3 text-sm"
          onClick={() => onEdit(offer.id)}
        >
          Modifier
        </button>
        <button
          className="btn btn-error w-1/3 text-sm"
          onClick={() => onDelete(offer.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
