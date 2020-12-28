import React from "react";

import "./Schedule.sass";

import ScheduleItem from "./ScheduleItem/ScheduleItem";

const Schedule = props => (
  <ul id="Schedule">
    {props.schedule.map(scheduleItem => (
      <ScheduleItem itemName={scheduleItem} />
    ))}
  </ul>
);

export default Schedule;