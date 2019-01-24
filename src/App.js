import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./trading-hours";

class App extends Component {
  render() {
    console.log(data);
    return (
      <div className="App">
        <table className="table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Open/Close</th>
          </tr>
          {data.map((instrument, index) => {
            return (
              <tr key={index}>
                <td>{instrument.instrumentID}</td>
                <td>{instrument.name}</td>
                <td>
                  {instrument.tradingHours.some(item => {
                    const timeFrom = new Date(item.from).toLocaleTimeString();
                    const timeTo = new Date(item.to).toLocaleTimeString();
                    const timeNow = new Date().toLocaleTimeString();
                    return timeFrom < timeNow && timeTo > timeNow;
                  })
                    ? "Open"
                    : "Close"}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
