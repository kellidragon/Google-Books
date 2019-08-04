import React from "react";
import SavedResults from "../SavedResults"
import "./style.css"


function Nav() {

 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <a className="boxed navbar-brand" href="/">
       Search
      </a>
      <a className="boxed navbar-brand" href="/saved" >
       Saved
      </a>
   
    </nav>
  );
}

export default Nav;
