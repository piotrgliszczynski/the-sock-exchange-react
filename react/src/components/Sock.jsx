import React from 'react';

const Sock = (props) => {
  const convertBoolean = (prop) => {
    return prop ? 'Yes' : 'No';
  }

  return (
    <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
      <div className="card-body">
        <h5 className="card-title">Sock Details</h5>
        <div className="card-text">Size: {props.data.sockDetails.size}</div>
        <div className="card-text">Color: {props.data.sockDetails.color}</div>
        <div className="card-text">Pattern: {props.data.sockDetails.pattern}</div>
        <div className="card-text">Material: {props.data.sockDetails.material}</div>
        <div className="card-text">Condition: {props.data.sockDetails.condition}</div>
        <div className="card-text">For Foot: {props.data.sockDetails.forFoot} </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">Additional features</h5>
        <div className="card-text">Water Resistant: {convertBoolean(props.data.additionalFeatures.waterResistant)}</div>
        <div className="card-text">Padded: {convertBoolean(props.data.additionalFeatures.padded)}</div>
        <div className="card-text">Anti Bacterial: {convertBoolean(props.data.additionalFeatures.antiBacterial)}</div>
      </div>
      <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <small className="text-muted">Added: {props.data.addedTimestamp}</small>
        <button className="btn btn-sm btn-danger" onClick={() =>
          props.handleDelete(props.data._id)
        }
        >Delete</button>
      </div>
    </div>
  )
}

export default Sock;