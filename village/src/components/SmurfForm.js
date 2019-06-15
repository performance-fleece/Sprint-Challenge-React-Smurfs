import React, { Component } from 'react';
import Axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    Axios.post("http://localhost:3333/smurfs", this.state)
      .then(res => this.props.history.push('/'))
      .catch(err => console.log(err));
    // add code to create the smurf using the api

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  updateSmurf = () => {
    const {age, name, height } = this.state;
    const { id } = this.props.location.state;
    const updateSmurf = { age, name, height };
    Axios.put(`http://localhost:3333/smurfs/${id}`, updateSmurf)
    .then(res => {this.props.history.push("/");
  })
  .catch(err => {
    console.log(err)
  })
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
