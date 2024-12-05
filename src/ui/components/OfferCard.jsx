import React from 'react';
import RemoteWorkIcons from './RemoteWorkIcons.jsx';

export default function OfferCard({ offer, onView, onEdit }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('offerId', offer.id);
    event.target.style.opacity = 0.5;
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  const techChips = offer.techStack.map((tech) => (
    <div key={tech} className="flex items-center px-3 py-1 bg-gray-500 rounded-full text-xs text-gray-200 m-1">
      <i className={`fab fa-${tech.toLowerCase()} text-sm mr-1`} /> {tech}
    </div>
  ));

  return (
    <div
      className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 mb-4 bg-gray-700 border border-gray-600 cursor-pointer hover:bg-gray-750"
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
          {/* <button
            className="btn bg-gray-600 w-12 h-12 flex justify-center items-center rounded-full p-0 m-0"
            style={{ fontSize: '16px' }}
            onClick={(event) => {
              event.stopPropagation();
              onEdit(offer.id);
            }}
          >
            <i className="fa-solid fa-pen text-base "></i>
          </button> */}
        </div>
      </div>

      <div className="border-t border-gray-600 p-4 flex flex-col justify-between items-start space-y-4">
        <p className="text-gray-200">
          <i className="fa fa-building mr-2"></i>{offer.companyName}
        </p>
        <p className="text-sm">
          <i className="fa fa-location-arrow mr-2"></i>{offer.location}
        </p>
        <RemoteWorkIcons remoteWork={offer.remoteWork} />
        <p className="text-sm">
          <i className="fa-solid fa-sack-dollar mr-2"></i>{offer.salary}
        </p>
        <div className="flex flex-wrap mt-2">
          {techChips}
        </div>
              
      </div>
    </div>
  );
}
