import React from 'react';
import ScheduleItem from './ScheduleItem.jsx';
import '../styles/ScheduleList.css';


function ScheduleList(props) {
  return (
    <div>
      {props.schedules.map((schedule, index) =>
        <ScheduleItem schedule={schedule} key={index} deleteSchedule={props.deleteSchedule} updateSchedule={props.updateSchedule} />
      )}
    </div>
  )
}

export default ScheduleList;