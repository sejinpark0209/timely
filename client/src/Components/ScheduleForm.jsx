import React from 'react';
import moment from 'moment';

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      time: '',
      url: ''
    }
    this.updateDescription= this.updateDescription.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateTime(e) {
    this.setState({ time: e.target.value });
  }

  updateUrl(e) {
    this.setState({ url: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { description, time, url } = this.state;
    const timeArr = time.split('-');
    const formatTime = moment(new Date(timeArr[0], timeArr[1] - 1, timeArr[2], timeArr[3], timeArr[4], 0)).format('lll');

    const formatTimeStr = formatTime.toString();

    const newSchedule = { description, formatTimeStr, url }

    this.props.postSchedule(newSchedule);
    // this.setState({description: '', time: '', updateUrl: ''});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.updateDescription} />
            </label>
            <label>
              Time(YYYY-MM-DD-HH-MM):
              <input type="text" name="time" value={this.state.time} onChange={this.updateTime} />
            </label>
            <label>
              Link:
              <input type="text" name="link" value={this.state.url} onChange={this.updateUrl} />
            </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
}


export default ScheduleForm;