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
  }

  getSchedule(schedule) {
    const schedules = this.state.schedules;
    schedules.push(schedule);
    this.setState({ schedules: schedules });
  }

  render() {
    // if(this.state.counter === 5) {
    //   window.open("https://developer.mozilla.org/en-US/");
    // }

    return (
      <div>
        <div><ScheduleForm getSchedule={this.getSchedule} /></div>
        <div><ScheduleList schedules={this.state.schedules} /></div>
      </div>
    );
  }
}

export default App;