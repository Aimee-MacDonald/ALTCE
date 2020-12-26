import React from "react";

import "./MainLayout.sass";

import List from "./List/List";

export default class MainLayout extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      listItems: []
    };

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
  }

  render(){
    return(
      <div id="MainLayout">
        <header></header>

        <nav>
          <aside>
            <List
              listItems={this.state.listItems}
              addListItem={this.addListItem}
              removeListItem={this.removeListItem}
            />
          </aside>

          <aside></aside>
        </nav>

        <article></article>
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

    const newItem = e.target.newItem.value;
    e.target.newItem.value = "";

    if(!!newItem && this.state.listItems.indexOf(newItem) === -1){
      this.setState(prevState => ({listItems: prevState.listItems.concat(newItem)}));
    }
  }

  removeListItem(itemName){
    this.setState(prevState => ({listItems: prevState.listItems.filter(item => item !== itemName)}));
  }
}