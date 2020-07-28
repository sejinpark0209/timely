import React from 'react';
import FootstepsItem from './FootstepsItem.jsx';
import '../styles/FootstepsList.css';


function FootstepsList(props) {
  return (
    <div>
      {props.footsteps.map((footstep, index) =>
        <FootstepsItem footstep={footstep} key={index} />
      )}
    </div>
  )
}

export default FootstepsList;