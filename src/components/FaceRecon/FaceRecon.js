import React from 'react';
import './FaceRecon.css';


const FaceRecon = ({imageURL, box}) =>{
return(
  <div className='center ma'>
    <div className="absolute mt2">
      <img src={imageURL} alt="" id='imageUrl' width='700px' height='auto'/>
      <div className="bounding_box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  </div>
)
}
export default FaceRecon;