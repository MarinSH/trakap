import React from 'react';

export default function OfferCard({ offer, onView, onEdit }) {
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
      onClick={() => onView(offer.id)}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-100">
            <i className="fa-solid fa-bullhorn mr-2"></i>{offer.offerName}
          </h3>
          <button
            className="btn bg-gray-600 w-12 h-12 flex justify-center items-center rounded-full p-0 m-0"
            style={{ fontSize: '16px' }}
            onClick={() => onEdit(offer.id)}
          >
            <i className="fa-solid fa-pen text-base "></i>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-600 p-4 flex flex-col justify-between items-start space-y-4">
        <p className="text-gray-200">
          <i className="fa fa-building mr-2"></i>{offer.companyName}
        </p>
        <p className="text-sm">
        <i className="fa fa-location-arrow mr-2"></i>{offer.location}
        </p>
        <p className="text-sm"> 
          <i className="fa-solid fa-sack-dollar mr-2"></i>{offer.salary}
        </p>
        <p className="text-sm"> 
          <i className="fa-solid fa-address-card mr-2"></i>{offer.contactName}
        </p>
      </div>
    </div>
  );
}
