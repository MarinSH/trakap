import React from 'react';

const RemoteWorkIcons = ({ remoteWork }) => {
  const remoteMap = {
    ONSITE: 0,
    ONEDAY: 1,
    TWODAY: 2,
    THREEDAY: 3,
    FOURDAY: 4,
    ALLDAY: 5,
    NONE: 1
  };

  const totalIcons = 5;
  const activeIcons = remoteMap[remoteWork] || 0;

  return (
    <div className="flex items-center space-x-2">
      {remoteWork === 'NONE' ? (
        <div className="flex items-center space-x-1">
          <i className="fas fa-circle-question text-lg text-secondary-500"></i>
          <span className="text-gray-200 text-sm">Non spécifié</span>
        </div>
      ) : (
        <div className="flex space-x-1">
          {[...Array(totalIcons)].map((_, index) => (
            <i
              key={index}
              className={`fas fa-home text-lg ${
                index < activeIcons ? 'text-secondary-500' : 'text-gray-400'
              }`}
            ></i>
          ))}
        </div>
      )}
    </div>
  );
};

export default RemoteWorkIcons;
