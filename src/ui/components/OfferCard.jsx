import React, { useState } from 'react';
import RemoteWorkIcons from './RemoteWorkIcons.jsx';
import { FEELING_TYPES } from '../../utils/config.js';

export default function OfferCard({ offer, onView, onLikeToggle }) {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(`offer-${offer.id}-liked`);
    return saved ? JSON.parse(saved) : offer.isLiked || false;
  });

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

  const currentDate = new Date();
  const sendDate = new Date(offer.sendAt);
  const diffInDays = Math.floor((currentDate - sendDate) / (1000 * 60 * 60 * 24)); 

  const isWarning = diffInDays > 10;
  const feeling = FEELING_TYPES.find((type) => type.value === offer.feelingType);

  const handleLikeToggle = (event) => {
    event.stopPropagation();
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    localStorage.setItem(`offer-${offer.id}-liked`, JSON.stringify(newLikeState));
    onLikeToggle(offer.id);
  };

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
            <span>{feeling ? feeling.label : 'Aucun ressenti'}</span> {offer.offerName}
          </h3>
          <button
            onClick={handleLikeToggle}
            className={`btn btn-circle ${isLiked ? 'text-warning-500' : 'text-gray-500'}`}
          >
            <i className={`text-2xl fa${isLiked ? '-solid' : '-regular'} fa-heart`}></i>
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
        <p className={`text-sm ${isWarning ? 'text-warning-500' : ''}`}>
          <i className="fa-solid fa-calendar mr-2"></i>{offer.sendAt}
        </p>
        <p className="text-sm">
          <i className="fa-solid fa-sack-dollar mr-2"></i>{offer.salary}
        </p>
        <RemoteWorkIcons remoteWork={offer.remoteWork} />
        <div className="flex flex-wrap mt-2">
          {techChips}
        </div>
      </div>
    </div>
  );
}
