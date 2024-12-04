import React from 'react';

export default function OfferCard({ offer, onView, onEdit, onDelete }) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{offer.offerName}</h3>
        <p className="text-gray-600">{offer.companyName}</p>
        <p className="text-sm">{offer.location}</p>
      </div>

      <div className="border-t p-4 flex justify-between items-center">
        <button
          className="btn btn-info w-1/3 text-sm"
          onClick={() => onView(offer.id)}
        >
          Voir
        </button>
        <button
          className="btn btn-warning w-1/3 text-sm"
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
