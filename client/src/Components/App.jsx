import React from 'react';
import ScheduleForm from './ScheduleForm.jsx';
import ScheduleList from './ScheduleList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    }
    this.getSchedule = this.getSchedule.bind(this);
    this.deleteScuedule = this.deleteSchedule.bind(this);
    this.updateScuedule = this.updateSchedule.bind(this);
  }

  getSchedule(schedule) {
    console.log(schedule);
    const schedules = this.state.schedules;
    schedules.push(schedule);
    this.setState({ schedules: schedules });
  }

  deleteSchedule(id) {
    console.log(id);
  }

  updateSchedule(id) {
    console.log(id);
  }

  render() {
    const { getSchedule, deleteSchedule, updateSchedule } = this;
    const { schedules } = this.state;

    return (
      <div>
        <div><ScheduleForm getSchedule={getSchedule} /></div>
        <div><ScheduleList schedules={schedules} deleteSchedule={deleteSchedule} updateSchedule={updateSchedule} /></div>
      </div>
    );
  }
}

export default App;