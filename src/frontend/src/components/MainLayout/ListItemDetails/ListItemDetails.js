import React from "react";

import "./ListItemDetails.sass";

const ListItemDetails = () => (
  <div id="ListItemDetails">
    <div id="details">
      <div id="description">
        <h1>Title</h1>
        <p>Description</p>
      </div>
      <div id="stats">
        <div class="stat_input">
          <label>Rank:</label>
          <input />
        </div>
        
        <div class="stat_input">
          <label>Time:</label>
          <input />
        </div>

        <div class="stat_input">
          <label>Difficulty:</label>
          <input />
        </div>

        <div class="stat_input">
          <label>Urgency:</label>
          <input />
        </div>
      </div>
    </div>
    <ul>
      <li>Child One</li>
    </ul>
  </div>
);

export default ListItemDetails;