import React from 'react';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import CompletedTasks from "./components/CompletedTasks";
import LoginModal from "./components/LoginModal";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props: any) {
    super(props)

    this.showModal = this.showModal.bind(this)
  }

  state = {
    isLoggedIn: false,
    displayLoginModal: false
  }

  showModal() {
    this.setState({ displayLoginModal: true })
  }

  render() {
    return (
      <div className="app">
        <Navbar isLoggedIn={this.state.isLoggedIn} clickLogInLogOut={this.showModal} />
        <div className="app-body">
          <Header />
          <CompletedTasks />
          <LoginModal displayLoginModal={this.state.displayLoginModal} />
        </div>
      </div>
    );
  }
}

export default App;
