import React, { Component } from "react";
import Axios from "axios";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
        name: this.props.location.state.name,
        age: this.props.location.state.age,
        height: this.props.location.state.height
      
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { age, name, height } = this.state;
    const smurf = { age, name, height };
    this.props.addSmurf(e, smurf);
    // add code to create the smurf using the api

    this.setState({
      name: "",
      age: "",
      height: ""
    });
    this.props.history.push('/');
  };

  handleUpdate = e => {
    const { age, name, height } = this.state;
    const { id } = this.props.location.state;
    const updateSmurf = { age, name, height };
    this.props.updateSmurf(e, id, updateSmurf);
    this.setState({
      name: "",
      age: "",
      height: ""
    });
    this.props.history.push('/');
    
  };

  handleInputChange = e => {
    e.persist();
    let value = e.target.value;
    this.setState({ [e.target.name]: value });
  }

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.props.location.state.type === "update" ? this.handleUpdate : this.handleSubmit}>
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
          <button type="submit">{this.props.location.state.type === "update" ? "Update Smurf" : "Add to the Village" }</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
