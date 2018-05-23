import React from 'react';


const FaceRecon = ({imageURL}) =>{
return(
  <div className='center ma'>
    <div className="absolute mt2">
      <img src={imageURL} alt="" width='700px' height='auto'/>
    </div>
  </div>
)
}
export default FaceRecon;