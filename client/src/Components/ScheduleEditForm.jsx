import React from 'react';

class ScheduleEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desciption: '',
      time: '',
      url: ''
    }
    this.updateDescription = this.updateDescription.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  updateDescription(e) {
    this.setState({desciption: e.target.value});
  }

  updateTime(e) {
    this.setState({time: e.target.value});
  }

  updateUrl(e) {
    this.setState({url: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { updateSchedule, schedule } = this.props;
    const { description, time, url } = this.state;
    updateSchedule(schedule.id, description, time, url );
    this.setState({ desciption: '', time: '', url: ''})
  }

  render() {
    const { desciption, time, url } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
            <input type="text" name="description" value={desciption} onChange={this.updateDescription} />
            <input type="text" name="time" value={time} onChange={this.updateTime} />
            <input type="text" name="url" value={url} onChange={this.updateUrl} />
          <input type="submit" value="Confirm" />
        </form>
      </div>
    )
  }
}

export default ScheduleEditForm;