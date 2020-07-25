import React from 'react';

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
    const newSchedule = { description, time, url }
    this.props.getSchedule(newSchedule);
    this.setState({description: '', time: '', updateUrl: ''});
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
              Time:
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