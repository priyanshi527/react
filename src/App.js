import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React,{ useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider.js';
function App() {
  const [{user} , dispatch] = useStateValue();
  return (
    // BEM naming convection
    <>
    <div className="app">
    {!user ? (
      <Login/>
    ) : (
    <div className="app_body">
    <Router>
    <Sidebar />
     <Switch>
     <Route path="/rooms/:roomId">
      <Chat/>
    </Route>
    <Route path="/">
      <Chat/>
    </Route>
    </Switch>
    </Router>
    </div>)}
    </div>
    </>
  );
}

export default App;
