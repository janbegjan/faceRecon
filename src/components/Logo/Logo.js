import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './icons8-brain-100.png';


const Logo = () => {
  return (
    <div className='ma2 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa2">
          <img style={{ paddingTop: '5px' }} src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  )
}
export default Logo;