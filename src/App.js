import React, { Component } from "react";
import "./App.css";
import data from "./trading-hours";
import TableRow from "./TableRow";

class App extends Component {
  state = {
    data: data,
    isChecked: false
  };

  findOpenInstrument = instrument => {
    return instrument.tradingHours.some(item => {
      const timeFrom = new Date(item.from).getUTCHours();
      const timeTo = new Date(item.to).getUTCHours();
      const timeNow = new Date().getUTCHours();
      return timeFrom < timeNow && timeTo > timeNow;
    });
  };

  updateData = () => {
    const newData = data.filter(instrument => {
      return this.findOpenInstrument(instrument);
    });
    this.setState({
      data: newData
    });
  };

  toggleCheckboxChange = () => {
    this.setState(
      prevState => ({
        isChecked: !prevState.isChecked
      }),
      () => {
        if (this.state.isChecked) {
          this.updateData();
        } else {
          this.setState({
            data: data
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <label>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleCheckboxChange}
          />
          Show open only
        </label>
        <table className="table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Open/Close</th>
          </tr>
          {this.state.data.map((instrument, index) => {
            return (
              <TableRow
                instrument={instrument}
                index={index}
                findOpenInstrument={this.findOpenInstrument}
              />
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
