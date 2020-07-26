import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import "@babel/polyfill";
import ScheduleForm from './ScheduleForm.jsx';
import ScheduleList from './ScheduleList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      scheduledIntervals: []
    }
    this.postSchedule = this.postSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.runTimeInterval = this.runTimeInterval.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    const temp = [];
    for(let i = 0; i < 3; i+= 1) {
      temp.push(i)
    }
    console.log(temp)
    $.ajax({
      method: "GET",
      url: "/api/0/schedules",
      success: (data) => {

        const futureIntervals = [];
        const sortedByTime = data[0].schedules.sort((a,b) => new moment(a.time) - new moment(b.time));
        console.log(sortedByTime)

        for(let i = 0; i < sortedByTime.length; i += 1) {
          const diffms = moment(sortedByTime[i].time).diff(moment());
          console.log(diffms)
          if(diffms > 0) {
            console.log(i)
            futureIntervals.push(sortedByTime[i]);
          }
        }
        console.log(futureIntervals)
        //something wrong
        // for(var i = 0; i < sortedByTime.length; i+= 1) {
        //   const diffms = moment(sortedByTime[i].time).diff(moment());
        //   // update schedules only scheduled for future
        //   console.log(typeof diffms)
        //   if(diffms > 0) {
        //     console.log("sbti: ", sortedByTime[i]);
        //     updatedSchedules.push(1);
        //     console.log(i + " " + updatedSchedules)
        //     intervals.push(diffms);
        //   }
        // }

        this.setState({ schedules: futureIntervals }, () => {
          console.log('line 45')
          console.log(this.state.schedules)
          // if(sortedByTime.length > 0) {
          //   console.log('starting run time interval')

          //   this.runTimeInterval();
          // }
        });
      },
      error: (err) => {
        console.log("err on get request: ", err);
      }
    });
  }

  runTimeInterval() {
    const calcIntervals = [];
    const { schedules, scheduledIntervals } = this.state;
    for(let i = 0; i < schedules.length; i += 1) {
      const diffms = moment(schedules[i].time).diff(moment());
      calcIntervals.push(diffms);
    }
    const firstInterval = calcIntervals.shift();
    const shiftedSchedule = schedules;
    const shiftedElement = shiftedSchedule.shift();
      setTimeout(() => {
        window.open("https://www.google.com");
        this.setState({ scheduledIntervals: calcIntervals, schedules: shiftedSchedule }, () => {
          $.ajax({
            method: "PUT",
            url: "/api/0/schedules",
            data: shiftedSchedule,
            success: (data) => {
              console.log("success timeout update")
            },
            error: (data) => {
              console.log("error on adding schedule");
            }
          });
        });
        if(calcIntervals.length > 0) {
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
    console.log('post schedule state: ', this.state.schedules);
    console.log(Array.isArray(this.state.schedules));
    const schedules = this.state.schedules;
    schedules.push(schedule);
    console.log('post schedules status: ', schedules)
    console.log('post updated schedules: ', this.state.schedules);
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