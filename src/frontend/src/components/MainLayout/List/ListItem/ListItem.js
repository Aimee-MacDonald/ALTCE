import React from "react";

import "./ListItem.sass";

const ListItem = props => (
  <li id="ListItem" onClick={props.showListItemDetails}>
    <p>{props.item.title}</p>
    <button onClick={() => props.removeListItem(props.item.title)}></button>
  </li>
);

export default ListItem;