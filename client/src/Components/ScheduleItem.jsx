import React from 'react';
import moment from 'moment';
import ScheduleEditForm from './ScheduleEditForm.jsx';

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
    let editForm;
    if(this.state.editClicked) {
      editForm = <ScheduleEditForm updateSchedule={this.props.updateSchedule} schedule={this.props.schedule}/>
    } else {
      null;
    }
    const diffms = moment(this.props.schedule.time).diff(moment());
    if(diffms > 0) {
      this.setExtendedTimeout(() => {
        window.open(this.props.schedule.url);
        this.props.deleteSchedule(this.props.schedule._id);
      }, diffms);
    }

    return (
      <div>
        Description: {this.props.schedule.description}
        <br/>
        Time: {this.props.schedule.time}
        <br/>
        Link: {this.props.schedule.url}
        <br/>
        {editForm}
        <button onClick={this.onEditClicked}>Edit</button>
        <button onClick={this.deleteClicked}>Delete</button>
      </div>
    )
  }
}


export default ScheduleItem;