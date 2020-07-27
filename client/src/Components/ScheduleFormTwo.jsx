import React from 'react';
import moment from 'moment';

class ScheduleFormTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      time: '',
      date: '',
      url: '',
      minbefore: 0,
      secbefore: 0,
    }
    this.updateDescription= this.updateDescription.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.updateMinbefore = this.updateMinbefore.bind(this);
    this.updateSecbefore = this.updateSecbefore.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateDate(e) {
    this.setState({ date: e.target.value });
  }

  updateTime(e) {
    this.setState({ time: e.target.value });
  }

  updateUrl(e) {
    this.setState({ url: e.target.value });
  }

  updateMinbefore(e) {
    this.setState({ minbefore: e.target.value });
  }

  updateSecbefore(e) {
    this.setState({ secbefore: e.target.value })
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { description, time, date, url, minbefore, secbefore } = this.state;

    const dateFormat = date.toString().split('-');
    const timeFormat = time.toString().split(':');

    const yy = Number(dateFormat[0]);
    const mm = Number(dateFormat[1]) - 1;
    const dd = Number(dateFormat[2]);
    const hh = Number(timeFormat[0]);
    const min = Number(timeFormat[1]);
    const formatTime = moment(new Date(yy, mm, dd, hh, min, 0)).format('lll');

    const formatTimeStr = formatTime.toString();
    const newSchedule = { description, formatTimeStr, url, minbefore, secbefore }

    this.props.postSchedule(newSchedule);
    this.setState({ description: '', updateUrl: '', minbefore: 0, secbefore: 0 });
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
              <input type="date" name="date" value={this.state.date} onChange={this.updateDate} />
            </label>
            <label>
              <input type="time" name="time" value={this.state.time} onChange={this.updateTime} />
            </label>
            <label>
              Link:
              <input type="text" name="link" value={this.state.url} onChange={this.updateUrl} />
            </label>
            <label>
              join earlier:
              <input type="number" name="earlymin" step="1" min="1" max="10" value={this.state.earlymin} onInput={this.updateMinbefore} />
              min
              <input type="number" name="earlysec" step="1" min="1" max="60"value={this.state.earlysec} onChange={this.updateSecbefore} />
              sec
            </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
}


export default ScheduleFormTwo;