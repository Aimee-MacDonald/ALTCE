import React from "react";

import "./ScheduleItem.sass";

const ScheduleItem = props => (
  <li id="ScheduleItem">
    {!props.productivityStateChanged &&
      <div className="vote">
        <button className="up"></button>
        <button className="down"></button>
      </div>
    }
    
    <p>{props.description}</p>
    <p>{props.time}</p>
  </li>
);

export default ScheduleItem;