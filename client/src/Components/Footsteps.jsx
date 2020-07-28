import React from 'react';
import FootstepsForm from './FootstepsForm.jsx';
import FootstepsList from './FootstepsList.jsx';
import '../styles/Footsteps.css';

function Footsteps(props) {

  return (
    <div className="footstepsContainer">
      <FootstepsForm postFootstep={props.postFootstep} />
      <FootstepsList footsteps={props.footsteps} />
    </div>
  )
}

export default Footsteps;