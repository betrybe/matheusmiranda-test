import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="container_box">
        <Switch>
          <Wallet path="/carteira" exact />
          <Login path="/" exact />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
