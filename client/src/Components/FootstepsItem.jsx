import React from 'react';
import moment from 'moment';
import '../styles/FootstepsItem.css';

class FootstepsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    let createdAt = moment(this.props.footstep.createdAt).format('lll');
    return (
      <div className="footstepItemContainer">
        <div className="itemInfo">
          <span className="footstepMessage">{this.props.footstep.message}</span>
          <br/>
          <span className="footstepUsername">{this.props.footstep.username} </span>
          <br/>
          <span className="footstepCreatedAt">{createdAt}</span>
          <br/>
        </div>
      </div>
    )
  }
}


export default FootstepsItem;