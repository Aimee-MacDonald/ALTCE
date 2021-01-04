import React from "react";

import "./Schedule.sass";

import ScheduleItem from "./ScheduleItem/ScheduleItem";

const Schedule = props => (
  <ul id="Schedule">
    {props.schedule.map(scheduleItem => (
      <ScheduleItem
        key={`scheduleItem_${scheduleItem.time}`}
        details={scheduleItem}
        vote={props.vote}
      />
    ))}
  </ul>
);

export default Schedule;