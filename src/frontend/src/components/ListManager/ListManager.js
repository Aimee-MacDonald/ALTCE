import React from "react";

import "./ListManager.sass";

export default class ListManager extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
  }

  render(){
    return(
      <div id="ListManager">
        <ul>
          {this.state.items && this.state.items.map((item, index) => (
            <li key={`item_${index}`}>
              <p>{item}</p>
              <button onClick={() => this.removeItem(item)}>X</button>
            </li>
          ))}
        </ul>

        <form onSubmit={this.addItem}>
          <input name="item" />
          <button>Add</button>
        </form>
      </div>
    );
  }

  componentDidMount(){
    try{
      const json = localStorage.getItem("items");
      const items = JSON.parse(json);

      if(items){
        this.setState(() => ({items}));
      }
    } catch(error){
      console.log("A wild Error Appeared!");
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.items.length !== this.state.items.length){
      const json = JSON.stringify(this.state.items);
      localStorage.setItem("items", json);
    }
  }

  addItem(e){
    e.preventDefault();

    let newItem = e.target.item.value;

    if(!!newItem && this.state.items.indexOf(newItem) === -1){
      this.setState(prevState => ({items: prevState.items.concat(newItem)}))
    }
  }

  removeItem(itemName){
    this.setState(prevState => ({items: prevState.items.filter(item => item !== itemName)}));
  }
}