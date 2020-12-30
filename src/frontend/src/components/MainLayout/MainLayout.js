import React from "react";

import "./MainLayout.sass";

import List from "./List/List";
import ListItemDetails from "./ListItemDetails/ListItemDetails";
import Header from "./Header/Header";
import Schedule from "./Schedule/Schedule";

export default class MainLayout extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      leftAsideOpen: false,
      rightAsideOpen: false,
      listItems: [],
      listItemDetails: {
        active: false,
        title: "",
        description: "",
        rank: 0,
        time: 0,
        difficulty: 0,
        urgency: 0,
        children: []
      },
      schedule: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item 10",
        "Item 11",
        "Item 12",
        "Item 13",
        "Item 14",
        "Item 15",
        "Item 16",
        "Item 17",
        "Item 18",
        "Item 19",
        "Item 20",
        "Item 21",
        "Item 22",
        "Item 23"
      ]
    };

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.showListItemDetails = this.showListItemDetails.bind(this);
    this.addListItemChild = this.addListItemChild.bind(this);
  }

  render(){
    return(
      <div id="MainLayout">
        <header>
          <Header />
        </header>

        <nav>
          <aside className={this.state.leftAsideOpen ? "open_aside" : "closed_aside"}>
            <List
              listItems={this.state.listItems}
              addListItem={this.addListItem}
              removeListItem={this.removeListItem}
              showListItemDetails={this.showListItemDetails}
            />
          </aside>

          <aside className={this.state.rightAsideOpen ? "open_aside" : "closed_aside"}>
            <Schedule
              schedule={this.state.schedule}
             />
          </aside>
        </nav>

        <article>
          <button className={this.state.leftAsideOpen ? "toggle_left_open" : "toggle_left_closed"} onClick={() => this.toggleAside("left")}></button>

          {this.state.listItemDetails.active && <ListItemDetails
            details={this.state.listItemDetails}
            addListItemChild={this.addListItemChild}
          />}

          <button className={this.state.rightAsideOpen ? "toggle_right_open" : "toggle_right_closed"} onClick={() => this.toggleAside("right")}></button>
        </article>
      </div>
    );
  }
  componentDidMount(){
    try{
      const json = localStorage.getItem("state");
      const newState = JSON.parse(json);

      if(newState){
        this.setState(() => ({listItems: newState.listItems}));
      }
    } catch(error){
      console.log("A wild Error Appeared!");
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
      const json = JSON.stringify(this.state);
      localStorage.setItem("state", json);
    }
  }

  addListItem(e){
    e.preventDefault();

    const newItem = {
      title: e.target.newItem.value,
      description: "",
      rank: 0,
      time: 0,
      difficulty: 0,
      urgency: 0,
      children: []
    };

    e.target.newItem.value = "";

    if(!!newItem && this.state.listItems.indexOf(newItem) === -1){
      this.setState(prevState => ({listItems: prevState.listItems.concat(newItem)}));
    }
  }

  removeListItem(itemName){
    this.setState(prevState => ({listItems: prevState.listItems.filter(item => item.title !== itemName)}));
  }

  showListItemDetails(e){
    let detailedItem = e.target.tagName;

    switch(detailedItem){
      case "LI":
        detailedItem = e.target.childNodes[0].innerText;
        break;
      
      case "P":
        detailedItem = e.target.innerText;
        break;

      default:
        detailedItem = "";
        break;
    }

    if(detailedItem){
      detailedItem = this.state.listItems.filter(item => item.title === detailedItem);
      detailedItem = detailedItem[0];
      
      const details = {
        active: true,
        title: detailedItem.title,
        description: detailedItem.description,
        rank: detailedItem.rank,
        time: detailedItem.time,
        difficulty: detailedItem.difficulty,
        urgency: detailedItem.urgency,
        children: detailedItem.children
      }

      this.setState(() => ({listItemDetails: details}));
    }
  }

  addListItemChild(e, parent){
    e.preventDefault();

    this.setState(prevState => {
      let listItems = prevState.listItems;
      let index = 0;

      let children = listItems.filter((item, c) => {
        if(item.title === parent){
          index = c;
          return true;
        }
      });

      children = children[0].children;
      
      const newItem = e.target.childTitle.value;

      if(!!newItem && !!children && children.indexOf(newItem) === -1){
        children.push(newItem);
        listItems[index].children = children;
        return {listItems};
      }
    });
  }

  toggleAside(side){
    if(side === "left"){
      this.setState(prevState => ({leftAsideOpen: !prevState.leftAsideOpen}));
    } else if(side === "right"){
      this.setState(prevState => ({rightAsideOpen: !prevState.rightAsideOpen}));
    }
  }
}