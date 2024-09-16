import React from 'react';

const AddSock = () => {

  const onSockSubmit = (event) => {
    event.preventDefault();
    let addSockRequest = {};
    addSockRequest.userId = event.target[0].value;

    addSockRequest.sockDetails = {};
    addSockRequest.sockDetails.size = event.target[1].value;
    addSockRequest.sockDetails.color = event.target[2].value;
    addSockRequest.sockDetails.pattern = event.target[3].value;
    addSockRequest.sockDetails.material = event.target[4].value;
    addSockRequest.sockDetails.condition = event.target[5].value;
    addSockRequest.sockDetails.forFoot = event.target[6].value;

    addSockRequest.additionalFeatures = {
      waterResistant: false,
      padded: false,
      antiBacterial: false
    }
    addSockRequest.addedTimestamp = new Date();

    fetch(import.meta.env.VITE_SOCKS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addSockRequest)
    })
      .then(response => response.json())
      .then(response => {
        alert(`Succesfully added new sock with id ${response._id}`)
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="col-4">
      <form className="text-start" id="add-sock" onSubmit={onSockSubmit}>
        <div className="m-2">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input className="form-control" type="text" id="userId" name="userId" />
        </div>
        <div className="m-2">
          <label htmlFor="size" className="form-label">Size</label>
          <select className="form-select" id="size" name="size">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div className="m-2">
          <label htmlFor="color" className="form-label">Color</label>
          <input className="form-control" type="text" id="color" name="color" />
        </div>
        <div className="m-2">
          <label htmlFor="pattern" className="form-label">Pattern</label>
          <input className="form-control" type="text" id="pattern" name="pattern" />
        </div>
        <div className="m-2">
          <label htmlFor="material" className="form-label">Material</label>
          <input className="form-control" type="text" id="material" name="material" />
        </div>
        <div className="m-2">
          <label htmlFor="condition" className="form-label">Condition</label>
          <select className="form-select" id="condition" name="condition">
            <option>New</option>
            <option>Used</option>
          </select>
        </div>
        <div className="m-2">
          <label htmlFor="for-foot" className="form-label">For Foot</label>
          <select className="form-select" id="for-foot" name="for-foot">
            <option>Left</option>
            <option>Right</option>
          </select>
        </div>
      </form>
      <button className="btn btn-primary m-2" type="submit" form="add-sock">Add Sock</button>
    </div>
  )
}

export default AddSock;