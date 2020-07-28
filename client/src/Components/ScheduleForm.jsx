import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import '../styles/ScheduleForm.css';

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      url: '',
      datefrom: '',
      dateuntil: '',
      time: '',
      day: [],
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      minbefore: 0,
      updateSecbefore: 0
    }
    this.updateDescription= this.updateDescription.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.updateDateFrom = this.updateDateFrom.bind(this);
    this.updateDateUntil = this.updateDateUntil.bind(this);
    this.updateMinbefore = this.updateMinbefore.bind(this);
    this.updateSecbefore = this.updateSecbefore.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateMon = this.updateMon.bind(this);
    this.updateTue = this.updateTue.bind(this);
    this.updateWed = this.updateWed.bind(this);
    this.updateThu = this.updateThu.bind(this);
    this.updateFri = this.updateFri.bind(this);
    this.updateSat = this.updateSat.bind(this);
    this.updateSun = this.updateSun.bind(this);
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

  updateDateFrom(e) {
    this.setState({ datefrom: e.target.value });
  }

  updateDateUntil(e) {
    this.setState({ dateuntil: e.target.value });
  }

  updateDay(day) {
    console.log('update day day:', day)
    const days = this.state.day;
    var counter = 0;
    for(let i = 0; i < days.length; i += 1) {
      if(days[i] == day) {
        counter += 1;
        days.splice(i, 1);
      }
    }
    if(counter === 0) {
      days.push(day);
    }
    counter = 0;
    this.setState({ day: days });
  }

  updateMon(e) {
    e.preventDefault();
    this.updateDay('mon');
    this.setState({ mon: !this.state.mon });
  }

  updateTue(e) {
    e.preventDefault();
    this.updateDay('tue');
    this.setState({ tue: !this.state.tue });
  }

  updateWed(e) {
    e.preventDefault();
    this.updateDay('wed');
    this.setState({ wed: !this.state.wed });
  }

  updateThu(e) {
    e.preventDefault();
    this.updateDay('thu');
    this.setState({ thu: !this.state.thu });
  }

  updateFri(e) {
    e.preventDefault();
    this.updateDay('fri');
    this.setState({ fri: !this.state.fri });
  }

  updateSat(e) {
    e.preventDefault();
    this.updateDay('sat');
    this.setState({ sat: !this.state.sat });
  }

  updateSun(e) {
    e.preventDefault();
    this.updateDay('sun');
    this.setState({ sun: !this.state.sun });
  }

  updateMinbefore(e) {
    this.setState({ minbefore: e.target.value });
  }

  updateSecbefore(e) {
    this.setState({ secbefore: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { description, datefrom, dateuntil, time, url, day, minbefore, secbefore } = this.state;

    const startDateFormat = datefrom.toString().split('-');
    const endDateFormat = dateuntil.toString().split('-');
    const timeFormat = time.toString().split(':');

    const startyy = Number(startDateFormat[0]);
    const startmm = Number(startDateFormat[1]) - 1;
    const startdd = Number(startDateFormat[2]);
    const starthh = Number(timeFormat[0]);
    const startmin = Number(timeFormat[1]);
    const endyy = Number(endDateFormat[0]);
    const endmm = Number(endDateFormat[1]) - 1;
    const enddd = Number(endDateFormat[2]);
    const endhh = Number(timeFormat[0]);
    const endmin = Number(timeFormat[1]);

    const possibleSchedules = [];
    const dayArrIndex = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    // if day.length > 0
    for(let i = 0; i < day.length; i += 1) {
      var firstDay = moment(new Date(startyy, startmm, startdd, starthh, startmin, 0));
      var lastDay = moment(new Date(endyy, endmm, enddd, endhh, endmin, 0));

      var idx = 0;
      for(let j = 0; j < dayArrIndex.length; j++) {
        if(dayArrIndex[j] === day[i]) {
          console.log('true?')
          idx = j;
        }
      }

      while(lastDay.diff(firstDay) > 0) {
        var firstDay = moment(new Date(startyy, startmm, startdd, starthh, startmin, 0)).day(idx);
        if(lastDay.diff(firstDay) < 0) {
          break;
        }
        possibleSchedules.push(firstDay.format('lll'));
        idx += 7;
      }
      idx = 0;
    }

    this.props.postMultSchedule(possibleSchedules, description, url, minbefore, secbefore)
    this.setState({description: '', url: ''});
  }

  render() {
    const { mon, tue, wed, thu, fri, sat, sun } = this.state;
    const monClicked = mon ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    const tueClicked = tue ? 'clickedBtn dayBtn': 'notClickedBtn dayBtn';
    const wedClicked = wed ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    const thuClicked = thu ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    const friClicked = fri ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    const satClicked = sat ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    const sunClicked = sun ? 'clickedBtn dayBtn' : 'notClickedBtn dayBtn';
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.updateDescription} />
            </label>
            <label>
              <input type="date" name="datefrom" value={this.state.datefrom} onChange={this.updateDateFrom} />
            </label>
            <label>
              <input type="date" name="dateuntil" value={this.state.dateuntil} onChange={this.updateDateUntil} />
            </label>
            <label>
              <input type="time" name="time" value={this.state.time} onChange={this.updateTime} />
            </label>
            <div>
              <button className={monClicked} onClick={this.updateMon} >MON</button>
              <button className={tueClicked} onClick={this.updateTue} >TUE</button>
              <button className={wedClicked} onClick={this.updateWed} >WED</button>
              <button className={thuClicked} onClick={this.updateThu} >THU</button>
              <button className={friClicked} onClick={this.updateFri} >FRI</button>
              <button className={satClicked} onClick={this.updateSat} >SAT</button>
              <button className={sunClicked} onClick={this.updateSun} >SUN</button>
            </div>
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


export default ScheduleForm;