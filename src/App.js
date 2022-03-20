import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/gamepage" render={ (props) => <GamePage { ...props } /> } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
        <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
      </Switch>
    </div>
  );
}
