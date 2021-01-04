import React from "react";

import "./Schedule.sass";

import ScheduleItem from "./ScheduleItem/ScheduleItem";

const Schedule = props => (
  <ul id="Schedule">
    <ScheduleItem productivityState={false} productivityStateChanged={true} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={false} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={true} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={false} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={true} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={false} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={true} description="Description" time="00:00" />
    <ScheduleItem productivityState={false} productivityStateChanged={false} description="Description" time="00:00" />
    {/*props.schedule.map(scheduleItem => (
      <ScheduleItem itemName={scheduleItem} key={`scheduleItem_${scheduleItem}`} />
    ))*/}
  </ul>
);

export default Schedule;