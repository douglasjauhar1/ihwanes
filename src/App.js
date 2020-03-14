import React, { Component } from 'react'
import  { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './Screens/Home'
import Table from './Screens/Table'
export default class App extends Component {
  render() {
    return (
      <Router>
      <Route exact path ={'/'} component={Home}/>
      <Route exact path ={'/table'} component={Table}/>
    </Router>
    )
  }
}
