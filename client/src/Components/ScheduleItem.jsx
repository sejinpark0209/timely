import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import ScheduleEditForm from './ScheduleEditForm.jsx';
import '../styles/ScheduleItem.css';

class ScheduleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editClicked: false,
    }
    this.onEditClicked = this.onEditClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.setExtendedTimeout = this.setExtendedTimeout.bind(this);
  }

  onEditClicked() {
    this.setState({ editClicked: !this.state.editClicked });
  }

  deleteClicked() {
    const { deleteSchedule, schedule } = this.props;
    deleteSchedule(schedule._id);
  }

  setExtendedTimeout(callback, ms) {
    if(ms > 2147483647) {
      setTimeout(() => {
        setExtendedimeout(callback, (ms - 2147483647));
      }, 2147483647);
    } else {
      setTimeout(callback, ms);
    }
  }

  render() {
    const { schedule, updateSchedule } = this.props;

    let editForm;
    if(this.state.editClicked) {
      editForm = <ScheduleEditForm updateSchedule={updateSchedule} schedule={schedule}/>
    } else {
      null;
    }

    const subtractSec = Number(schedule.minbefore) * 60 + Number(schedule.secbefore);
    const diffms = moment(schedule.time).subtract(subtractSec, 'seconds').diff(moment());

    if(diffms > 0) {
      this.setExtendedTimeout(() => {
        window.open(schedule.url);
        this.props.deleteSchedule(schedule._id);
      }, diffms);
    }

    return (
      <div className="itemContainer">
        <div className="itemInfo">
          <span className="itemDes">Description: {schedule.description}</span>
          <br/>
          <span className="itemTime">Time: {schedule.time} </span>
          <br/>
          <span className="itemLink">Link: <a href={schedule.url}>{schedule.url}</a> </span>
          <br/>
          {editForm}
        </div>
        <div className="itemBtnContainer">
          {/* <button className="itemEditBtn" onClick={this.onEditClicked}>Edit</button> */}
          <button className="itemDeleteBtn" onClick={this.deleteClicked}>Delete</button>
        </div>
      </div>
    )
  }
}


export default ScheduleItem;