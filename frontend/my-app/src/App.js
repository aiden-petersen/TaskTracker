import React from 'react';
import Header from "./components/Header";
import ActiveTask from "./components/ActiveTask";
import CompletedTasks from "./components/CompletedTasks";
import 'bootstrap';
import './App.css';

// const activeTask = true;
function App() {
  return (
    <div className="app">
      <Header />
      <ActiveTask />
      <CompletedTasks />
    </div>
  );
}

export default App;
