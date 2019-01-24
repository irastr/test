import React, { Component } from "react";
import "./App.css";
// import data from "./trading-hours";
import TableRow from "./TableRow";

class App extends Component {
  state = {
    data: [],
    isChecked: false
  };

  componentDidMount() {
    fetch("/trading-hours.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data
        });
      });
  }

  getData = () => {
    return this.state.isChecked
      ? this.state.data.filter(instrument =>
          this.findOpenInstrument(instrument)
        )
      : this.state.data;
  };

  findOpenInstrument = instrument => {
    return instrument.tradingHours.some(item => {
      const timeFrom = new Date(item.from).getUTCHours();
      const timeTo = new Date(item.to).getUTCHours();
      const timeNow = new Date().getUTCHours();
      return timeFrom < timeNow && timeTo > timeNow;
    });
  };

  toggleCheckboxChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  render() {
    const dataWithFilter = this.getData();
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
          {dataWithFilter.map((instrument, index) => {
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
