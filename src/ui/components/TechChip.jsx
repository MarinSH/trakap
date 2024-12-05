import React, { useEffect, useRef, useState } from 'react';
import { CONFIG_TECH_STACK } from '../../utils/config.js'; 

const TechChip = ({ tech }) => {
  const [iconLoaded, setIconLoaded] = useState(true);
  const iconRef = useRef(null);
  
  useEffect(() => {
    if (iconRef.current) {
      const iconElement = iconRef.current;
      const iconSize = iconElement.offsetWidth;
      if (iconSize < 2) {
        setIconLoaded(false); 
      }
    }
  }, []);

  const iconClass = `fab fa-${tech.toLowerCase()}`;

  return (
    <div className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-ms text-gray-700 m-1">
      <i ref={iconRef} className={iconClass}></i>
      {!iconLoaded && <span className="ml-2">{tech}</span>} 
    </div>
  );
};

export default TechChip;
