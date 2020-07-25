import React from 'react';
import ScheduleEditForm from './ScheduleEditForm.jsx';

class ScheduleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editClicked: false,
    }
    this.onEditClicked = this.onEditClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  onEditClicked() {
    this.setState({ editClicked: !this.state.editClicked });
  }

  deleteClicked() {
    const { deleteSchedule, schedule } = this.props;
    deleteSchedule(schedule.id);
  }

  render() {
    let editForm;
    if(this.state.editClicked) {
      editForm = <ScheduleEditForm updateSchedule={this.props.updateSchedule} schedule={this.props.schedule}/>
    } else {
      null;
    }
    console.log(this.props.schedule)

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