import React from "react";

import "./Header.sass";

const Header = props => (
  <div id="Header">
    <h1>ALTCE</h1>
    
    <nav>
      <button onClick={props.clear}>Clear</button>
    </nav>
  </div>
);

export default Header;