import React from "react";
import ReactDOM from "react-dom";
import firebase from "./fire";

import "./styles.css";

class App extends React.Component {
  state = {
    todos: [],
    name: ""
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const notesRef = firebase.database().ref("my-notes-app");
    notesRef.push({ name: this.state.name });
    this.setState({ name: "" });
  };
  componentDidMount() {
    const notesRef = firebase.database().ref("my-notes-app");
    notesRef.on("value", snapshot => {
      let notesFromDatabase = snapshot.val();
      let todos = [];
      for (let todo in notesFromDatabase) {
        todos.push({
          id: todo,
          name: notesFromDatabase[todo].name
        });
        this.setState({ todos });
      }
    });
  }
  handleDelete = id => {
    const notesRef = firebase.database().ref(`my-notes-app/${id}`);
    notesRef.remove();
  };

  render() {
    return (
      <div className="App">
        <h2>Firebase TODO!</h2>

        {this.state.todos.map(todo => {
          return (
            <li key={todo.id}>
              {todo.name}{" "}
              <button onClick={() => this.handleDelete(todo.id)}>X</button>
            </li>
          );
        })}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a todo"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <input type="submit" value="Add Note" />
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
