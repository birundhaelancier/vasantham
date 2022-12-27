import React from "react";
import moment from "moment";
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    let date1 = moment();
    let date2 = moment("29-");
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <div>Waktu tersisa {moment(this.state.date).format("hh:mm:ss")}.</div>
      </div>
    );
  }
}
export default Clock;
