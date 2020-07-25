import React from 'react';
import $ from 'jquery';
import ScheduleForm from './ScheduleForm.jsx';
import ScheduleList from './ScheduleList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    }
    this.postSchedule = this.postSchedule.bind(this);
    this.deleteScuedule = this.deleteSchedule.bind(this);
    this.updateScuedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/0/schedules",
      success: (data) => {
        console.log(data);
        this.setState({ schedules: data[0].schedules });
      },
      error: (err) => {
        console.log("err on get request: ", err);
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
      success: (data) => {
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

  updateSchedule(id) {
    console.log(id);
  }

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