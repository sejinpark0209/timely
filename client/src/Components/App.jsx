import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import ScheduleForm from './ScheduleForm.jsx';
import ScheduleList from './ScheduleList.jsx';
import ScheduleFormTwo from './ScheduleFormTwo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      scheduledIntervals: [],
      view: 'option1'
    }
    this.postSchedule = this.postSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    const browserUrl = window.location.href.split('/');
    const userid = browserUrl[browserUrl.length - 1] || '2';

    $.ajax({
      method: "GET",
      url: `/api/${userid}/schedules`,
      success: (data) => {

        const futureIntervals = [];
        const sortedByTime = data[0].schedules.sort((a,b) => new moment(a.time) - new moment(b.time));

        for(let i = 0; i < sortedByTime.length; i += 1) {
          const diffms = moment(sortedByTime[i].time).diff(moment());
          if(diffms > 0) {
            futureIntervals.push(sortedByTime[i]);
          }
        }

        this.setState({ schedules: futureIntervals }, () => {
          $.ajax({
            method: "PUT",
            url: "/api/0/schedules",
            data: { data: JSON.stringify(this.state.schedules) },
            success: (data) => {
              console.log('component mount update posted!')
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

  postSchedule(schedule, minBefore, secBefore) {
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

                for(let i = 0; i < sortedByTime.length; i += 1) {
                  const diffms = moment(sortedByTime[i].time).diff(moment());
                  console.log(diffms)
                  if(diffms > 0) {
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

  changeView() {
    if(this.state.view === 'option1') {
      this.setState({ view: 'option2' });
    } else {
      this.setState({ view: 'option1'});
    }
  }

  render() {
    const { postSchedule, deleteSchedule, updateSchedule } = this;
    const { schedules, view } = this.state;

    let form;
    if(view === 'option2') {
      form = <ScheduleForm postSchedule={postSchedule} />;
    } else {
      form = <ScheduleFormTwo postSchedule={postSchedule} />;
    }

    return (
      <div>
        <button onClick={this.changeView} >change view</button>
        <div>{form}</div>
        <div><ScheduleList schedules={schedules} deleteSchedule={deleteSchedule} updateSchedule={updateSchedule} /></div>
      </div>
    );
  }
}

export default App;