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
  }

  componentDidMount() {
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

        this.setState({ schedules: futureIntervals }, () => {
          console.log(this.state.schedules)
          $.ajax({
            method: "PUT",
            url: "/api/0/schedules",
            data: { data: JSON.stringify(this.state.schedules) },
            success: (data) => {
              console.log('component mount update posted!')
              // $.ajax({
              //   method: "GET",
              //   url: "/api/0/schedules",
              //   success: (data) => {
              //     this.setState({ schedules: data[0].schedules });
              //   },
              //   error: (err) => {
              //     console.log("err on get request: ", err);
              //   }
              // });
            },
            error: (data) => {
              console.log("error on adding schedule");
            }
          });
        });
      },
      error: (err) => {
        console.log("err on get request: ", err);
      }
    });
  }

  postSchedule(schedule) {
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
                this.setState({ schedules: futureIntervals });
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

  render() {
    const { postSchedule, deleteSchedule, updateSchedule } = this;
    const { schedules } = this.state;

    return (
      <div>
        <button>change view</button>
        <div><ScheduleForm postSchedule={postSchedule} /></div>
        <div><ScheduleList schedules={schedules} deleteSchedule={deleteSchedule} updateSchedule={updateSchedule} /></div>
      </div>
    );
  }
}

export default App;