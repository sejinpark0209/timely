import React from 'react';
import ScheduleItem from './ScheduleItem.jsx';

function ScheduleList(props) {
  console.log(props.schedules);
  return (
    <div>
      {props.schedules.map((schedule, index) =>
        <ScheduleItem schedule={schedule} key={index} deleteSchedule={props.deleteSchedule} updateSchedule={props.updateSchedule} />
      )}
    </div>
  )
}

export default ScheduleList;