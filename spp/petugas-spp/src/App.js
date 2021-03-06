import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Pembayaran from "./pages/Pembayaran"
export default class App extends React.Component{
  render(){
    return(
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/pembayaran" component={Pembayaran}/>
      </Switch>
    )
  }
}