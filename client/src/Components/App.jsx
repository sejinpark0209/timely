import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import ScheduleForm from './ScheduleForm.jsx';
import ScheduleList from './ScheduleList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      scheduleIntervals: []
    }
    this.postSchedule = this.postSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.runTimeInterval = this.runTimeInterval.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/0/schedules",
      success: (data) => {
        console.log(data);
        const scheduleIntervals = [];
        const updatedSchedules = [];
        const sortedByTime = data[0].schedules.sort((a,b) => new moment(a.time) - new moment(b.time));
        console.log("sorted Arr, ", sortedByTime);
        for(let i = 0; i < sortedByTime.length; i+= 1) {
          console.log('what?????')
          const diffms = moment(sortedByTime[i].time).diff(moment());
          console.log('diffms: ', diffms)
          // update schedules only scheduled for future
          if(diffms > 0) {
            console.log('if statement diff')
            console.log(sortedByTime[i])
            updatedSchedules.push(sortedByTime[i]);
            scheduleIntervals.push(diffms);
          }
        }
        console.log("line 40: ", updatedSchedules)
        console.log("line 40: ", scheduleIntervals)
        this.setState({ schedules: updatedSchedules, scheduleIntervals: scheduleIntervals }, () => {
          console.log('line 45')
          if(this.state.schedules.length > 0) {
            this.runTimeInterval();
          }
          console.log('just before update schedule')
          // why updateSchedule not work?
          this.updateSchedule();
        });
      },
      error: (err) => {
        console.log("err on get request: ", err);
      }
    });
  }

  runTimeInterval() {
    console.log('hi')
    const { scheduleIntervals, schedules } = this.state;
    const firstInterval = scheduleIntervals.shift();
    const shiftedSchedule = schedules;
    shiftedSchedule.shift();

    setTimeout(function() {
      window.open("https://www.google.com");
      this.setState({ scheduleIntervals: scheduleIntervals, schedules: shiftedSchedule });
      if(timeIntervals.length > 0) {
        this.runTimeInterval();
      } else {
        return;
      }
    }, firstInterval);
  }

  updateSchedule() {
    console.log('updateschedule like77')
    console.log('update schedule state: ', this.state.schedules)
    // error in data
    $.ajax({
      method: 'PUT',
      url: "/api/0/schedules",
      data: { data: this.state.schedules },
      success: (data) => {
        console.log('update complete');
      }
    });
  }

  postSchedule(schedule) {
    console.log(schedule);
    const schedules = this.state.schedules;
    schedules.push(schedule);
    this.setState({ schedules: schedules },
      () => {
        $.ajax({
          method: "POST",
          url: "/api/0/schedules",
          data: schedule,
          success: (data) => {
            $.ajax({
              method: "GET",
              url: "/api/0/schedules",
              success: (data) => {
                this.setState({ schedules: data[0].schedules });
              },
              error: (err) => {
                console.log("err on get request: ", err);
              }
            });
          },
          error: (data) => {
            console.log("error on adding schedule");
          }
        });
      }
    );
  }

  deleteSchedule(scheduleid) {
    $.ajax({
      method: "DELETE",
      url: "/api/0/schedules/" + scheduleid,
      success: () => {
        $.ajax({
          method: "GET",
          url: "/api/0/schedules",
          success: (data) => {
            console.log('this is delete get req')
            console.log(data[0].schedules);
            // why undefined?
            console.log(this.state.schedules);
            this.setState({ schedules: data[0].schedules });
          },
          error: (err) => {
            console.log("err on delete/get request: ", err);
          }
        });
      },
      error: (err) => {
        console.log("err on delete request: ", err);
      }
    });
  }

  // updateSchedule(id) {
  //   console.log(id);
  // }

  render() {
    const { postSchedule, deleteSchedule, updateSchedule } = this;
    const { schedules } = this.state;

    return (
      <div>
        <div><ScheduleForm postSchedule={postSchedule} /></div>
        <div><ScheduleList schedules={schedules} deleteSchedule={deleteSchedule} updateSchedule={updateSchedule} /></div>
      </div>
    );
  }
}

export default App;