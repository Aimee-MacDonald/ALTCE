import React from "react";

import "./ScheduleItem.sass";

const ScheduleItem = props => (
  <li id="ScheduleItem">
    {!props.details.productivityStateChanged &&
      <div className="vote">
        <button className="up" onClick={() => props.vote(props.details.description, true)}></button>
        <button className="down" onClick={() => props.vote(props.details.description, false)}></button>
      </div>
    }
    
    <p>{props.details.description}</p>
    <p>{props.details.time}</p>
    <button onClick={() => props.remove(props.details.description)}>-</button>
  </li>
);

export default ScheduleItem;