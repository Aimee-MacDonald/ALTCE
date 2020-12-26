import React from "react";

import "./ListItem.sass";

const ListItem = props => (
  <li id="ListItem">
    <p>{props.item}</p>
    <button onClick={() => props.removeListItem(props.item)}></button>
  </li>
);

export default ListItem;