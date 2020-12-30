import React from "react";

import "./Schedule.sass";

import ScheduleItem from "./ScheduleItem/ScheduleItem";

const Schedule = props => (
  <ul id="Schedule">
    {props.schedule.map(scheduleItem => (
      <ScheduleItem itemName={scheduleItem} key={`scheduleItem_${scheduleItem}`} />
    ))}
  </ul>
);

export default Schedule;