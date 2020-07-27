import React from 'react';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker'

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      url: '',
      date: new Date()
    }
    this.updateDescription= this.updateDescription.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.updateDatePickerChange = this.updateDatePickerChange.bind(this);
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

  updateDatePickerChange(date) {
    this.setState({ date });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { description, date, url } = this.state;
    const formatTime = moment(date).format('lll');

    const formatTimeStr = formatTime.toString();

    const newSchedule = { description, formatTimeStr, url }

    this.props.postSchedule(newSchedule);
    this.setState({description: '', url: ''});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.updateDescription} />
            </label>
            <DateTimePicker onChange={this.updateDatePickerChange} value={this.state.date} />
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