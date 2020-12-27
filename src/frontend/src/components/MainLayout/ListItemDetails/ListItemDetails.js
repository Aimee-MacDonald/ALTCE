import React from "react";

import "./ListItemDetails.sass";

const ListItemDetails = props => (
  <div id="ListItemDetails">
    <div id="details">
      <div id="description">
        <h1>{props.details.title}</h1>
        <p>{props.details.description}</p>
      </div>
      <div id="stats">
        <div className="stat_input">
          <label>Rank:</label>
          <input defaultValue={props.details.rank} />
        </div>
        
        <div className="stat_input">
          <label>Time:</label>
          <input defaultValue={props.details.time} />
        </div>

        <div className="stat_input">
          <label>Difficulty:</label>
          <input defaultValue={props.details.difficulty} />
        </div>

        <div className="stat_input">
          <label>Urgency:</label>
          <input defaultValue={props.details.urgency} />
        </div>
      </div>
    </div>
    <ul>
      <li>Child One</li>
    </ul>
  </div>
);

export default ListItemDetails;