import React from 'react';
import { Link } from 'react-router-dom';
 
const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <div className="smurf-buttons">
        <Link to={{
          pathname: "/smurf-form",
          state: {
            id: props.id,
            name: props.name,
            age: props.age,
            height: props.height,
            type: "update"
          }
        }}
        >
          <button>Update</button>
        </Link>
        <Link to="/">
          <button onClick={() => props.deleteSmurf(props.id)}>Delete</button>
        </Link>
      </div>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

