import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import FootstepsList from './FootstepsList.jsx';
import '../styles/FootstepsForm.css';

class FootstepsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    }
    this.updateUsername= this.updateUsername.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { username, message } = this.state;
    this.props.postFootstep(username, message);
  }

  render() {

    return (
      <div className="footstepFormContainer">
        <form onSubmit={this.onSubmitHandler}>
          <div className="footstepFormUserContainer">
            <label>
              Name
              <input className="usernameInput" type="text" name="username" value={this.state.username} onChange={this.updateUsername} />
            </label>
          </div>
          <div className="footstepFormMessageContainer">
              <label className="messageLabel">
                Message
              </label>
                <textarea className="messageInput" type="text" name="message" value={this.state.message} onChange={this.updateMessage} >
                </textarea>
          </div>
          <div className="footstepSubmitBtnCont">
            <input className="footstepSubmitBtn" type="submit" value="Leave Footstep" />
          </div>
        </form>
      </div>
    )
  }
}



export default FootstepsForm;