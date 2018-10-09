import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 1, minutes: 0, hours: 0, isOn: true, projects: "" };
  }

  saveProject() {
    clearInterval(this.interval);

    const { minutes, hours, projects } = this.state;

    console.log(minutes, hours, projects);

    let data = [[hours, minutes, projects]];

    axios
      .post(
        `https://script.google.com/macros/s/AKfycbyiJO14AXUQmhk7dTe8OEOFJ5pnnukOETv8JYb14wF7XmjNkI0K/exec?data=${data}`
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    this.setState({
      seconds: 1,
      minutes: 0,
      hours: 0,
      isOn: false,
      projects: ""
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
      minutes: parseInt(prevState.seconds / 60) % 60,
      hours: parseInt(prevState.seconds / 3600)
    }));
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000);
    console.log(this.state);
  }

  renderTimer() {
    return (
      <div className="timer">
        <p className="timer-label">Total Time Spent</p>

        <p className="timer-text">
          <span className="hours">
            {this.state.hours}
            h:{" "}
          </span>
          <span className="minutes">
            {this.state.minutes % 60}
            m:{" "}
          </span>
          <span className="seconds">
            {(this.state.seconds - 1) % 60}
            s:
          </span>
        </p>
      </div>
    );
  }

  deleteProject() {
    clearInterval(this.interval);
    this.setState({
      seconds: 1,
      minutes: 0,
      hours: 0,
      isOn: false,
      projects: ""
    });
  }

  stopTimer() {}

  listOfProjects() {
    return this.state.projects !== "" ? (
      <li>
        <button className="btn-save" onClick={this.saveProject.bind(this)}>
          Save
        </button>
        <h2>{this.state.projects}</h2>
        {this.renderTimer()}
        <button className="btn start" onClick={this.startTimer.bind(this)}>
          Start
        </button>
        <button className="delete-btn" onClick={this.deleteProject.bind(this)}>
          <i className="fa fa-times" />
        </button>
      </li>
    ) : null;
  }

  render() {
    return (
      <div>
        <header role="banner">
          <h1>Time Tracker</h1>
          <form className="project-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="projects"
              placeholder="Enter project name"
              id="projectInput"
              onChange={this.handleChange}
            />
          </form>
        </header>

        <main role="main">
          <ul className="projects">{this.listOfProjects()}</ul>
        </main>
      </div>
    );
  }
}

export default Dashboard;
