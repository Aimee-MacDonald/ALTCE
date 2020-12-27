import React from "react";

import "./MainLayout.sass";

import List from "./List/List";
import ListItemDetails from "./ListItemDetails/ListItemDetails";
import Header from "./Header/Header";

export default class MainLayout extends React.Component{
  constructor(props){
    super(props);

    this.state = {
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
      }
    };

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.showListItemDetails = this.showListItemDetails.bind(this);
  }

  render(){
    return(
      <div id="MainLayout">
        <header>
          <Header />
        </header>

        <nav>
          <aside>
            <List
              listItems={this.state.listItems}
              addListItem={this.addListItem}
              removeListItem={this.removeListItem}
              showListItemDetails={this.showListItemDetails}
            />
          </aside>

          <aside></aside>
        </nav>

        <article>
          {this.state.listItemDetails.active && <ListItemDetails details={this.state.listItemDetails} />}
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
      const details = {
        active: true,
        title: detailedItem,
        description: "",
        rank: 0,
        time: 0,
        difficulty: 0,
        urgency: 0,
        children: []
      }

      this.setState(() => ({listItemDetails: details}));
    }
  }
}