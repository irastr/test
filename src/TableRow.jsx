import React from "react";

export default class TableRow extends React.PureComponent {
  render() {
    const { index, instrument, findOpenInstrument } = this.props;
    return (
      <tr key={index}>
        <td>{instrument.instrumentID}</td>
        <td>{instrument.name}</td>
        <td>
          {// instrument.tradingHours.some(item => {
          // const timeFrom = new Date(item.from).getUTCHours();
          // const timeTo = new Date(item.to).getUTCHours();
          // const timeNow = new Date().getUTCHours();
          // return timeFrom < timeNow && timeTo > timeNow;
          findOpenInstrument(instrument) ? "Open" : "Close"}
        </td>
      </tr>
    );
  }
}
