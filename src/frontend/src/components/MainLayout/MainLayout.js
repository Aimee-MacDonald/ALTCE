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
      schedule: []
    };

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.showListItemDetails = this.showListItemDetails.bind(this);
    this.addListItemChild = this.addListItemChild.bind(this);
    this.removeListItemChild = this.removeListItemChild.bind(this);
    this.scheduleItem = this.scheduleItem.bind(this);
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
              vote={this.voteScheduleItem}
             />
          </aside>
        </nav>

        <article>
          <button className={this.state.leftAsideOpen ? "toggle_left_open" : "toggle_left_closed"} onClick={() => this.toggleAside("left")}></button>

          {this.state.listItemDetails.active && <ListItemDetails
            details={this.state.listItemDetails}
            addListItemChild={this.addListItemChild}
            removeListItemChild={this.removeListItemChild}
            scheduleItem={this.scheduleItem}
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
        this.setState(() => ({schedule: newState.schedule}));
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

  removeListItemChild(parent, child){
    let index = 0;

    this.setState(prevState => {
      let parentElement = prevState.listItems;
      parentElement = parentElement.filter((item, c) => {
        index = c;
        return item.title === parent;
      });

      parentElement = parentElement[0];
      
      let children = parentElement.children;
      children = children.filter(item => item !== child);
      
      parentElement.children = children;
      
      let listItems = prevState.listItems;
      listItems[index] = parentElement;

      let listItemDetails = prevState.listItemDetails;
      listItemDetails.children = children;
      
      return {
        listItems: listItems,
        listItemDetails: listItemDetails
      };
    });
  }

  scheduleItem(title){
    this.setState(prevState => {
      let schedule = prevState.schedule;

      let time = schedule.length;
      if(time < 10) time = `0${time}`;
      time = `${time}:00`;
      
      let filtered = schedule.filter(item => item.description === title);

      if(filtered.length === 0){
        schedule.push({
          productivityState: false,
          productivityStateChanged: false,
          description: title,
          time: time
        });

        return {schedule};
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

  voteScheduleItem(item, vote){
    console.log("Vote Schedule Item");
    console.log(item);
    console.log(vote);
  }
}