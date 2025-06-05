import React, { useEffect, useState } from 'react';
import mapImage from '../assets/mapView.png';

const Mapview = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <img
        src={mapImage}
        alt="Map View"
        style={{ width: '700px', height: `${windowHeight}px`, objectFit: 'cover' }}
      />
    </div>
  );
};

export default Mapview;
