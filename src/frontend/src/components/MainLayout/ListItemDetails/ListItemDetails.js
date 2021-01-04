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

    <div>
      <form onSubmit={e => props.addListItemChild(e, props.details.title)}>
        <label htmlFor="childTitle">Add Child</label>
        <input id="childTitle" />
        <button>+</button>
      </form>

      <ul>
        {props.details.children && props.details.children.map((child, index) => (
          <li key={`child_${index}`}>
            <p>{child}</p>
            <button onClick={props.scheduleItem}>+</button>
            <button onClick={() => props.removeListItemChild(props.details.title, child)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ListItemDetails;