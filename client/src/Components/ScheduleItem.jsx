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

    return (
      <div>
        {this.props.schedule.description}{" "}{this.props.schedule.time}{" "}{this.props.schedule.url}
        {editForm}
        <button onClick={this.onEditClicked}>Edit</button>
        <button onClick={this.deleteClicked}>Delete</button>
      </div>
    )
  }
}


export default ScheduleItem;