import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
class App extends React.Component {
  render() {
    return (
      <>
        <div className="App custom-flex-center">
          <Dashboard />
        </div>
      </>
    );
  }
}

export default App;
