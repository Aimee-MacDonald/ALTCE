import React from "react";

import "./List.sass";

import ListItem from "./ListItem/ListItem";

const List = props => (
  <div id="List">
    <ul>
      {props.listItems && props.listItems.map((item, index) => (
        <ListItem
          key={`item_${index}`}
          item={item}
          removeListItem={props.removeListItem}
          showListItemDetails={props.showListItemDetails}
        />
      ))}
    </ul>

    <form onSubmit={props.addListItem}>
      <input name="newItem"/>
      <button>+</button>
    </form>
  </div>
);

export default List;