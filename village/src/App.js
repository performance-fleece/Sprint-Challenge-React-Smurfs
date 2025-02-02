import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: null,
      smurfs: [],
      error: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({ smurfs: res.data })
      })
      .catch(err => {
        console.log(err)
      })

  }

  updateSmurf = (e, id, item) => {
    e.preventDefault();
    axios.put(`http://localhost:3333/smurfs/${id}`, item)
    .then(res => {
      this.setState({
        smurfs: res.data
      })
    })
    .catch(err=> console.log(err));
  }

  addSmurf = (e, item) => {
    e.preventDefault();
    axios.post("http://localhost:3333/smurfs", item)
    .then(res => {
      this.setState({
        smurfs: res.data
      })
    })
    .catch(err => console.log(err));
  };

  deleteSmurf = id => {
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({ smurfs: res.data })
      })
      .catch(err => console.log(err))
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <NavLink to="/">
            <button>Smurfs</button>
          </NavLink>
          <NavLink to={{
          pathname: "/smurf-form",
          state: {
            name: "",
            age: "",
            height: ""
          }
        }}
        ><button>Add Smurf</button></NavLink>
        </div>
        {/* <SmurfForm /> */}
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
        <Route exact path="/smurf-form" render={props => <SmurfForm {...props} addSmurf={this.addSmurf} updateSmurf={this.updateSmurf} />} />
        <Route
           exact path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} addSmurf={this.addSmurf} deleteSmurf={this.deleteSmurf} />}
        />
      </div>
    );
  }
}

export default App;
