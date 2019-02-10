import React, { Component } from 'react';
import UserContainer from './UserContainer';
import TripContainer from './TripContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<UserContainer />
				<TripContainer />
			</div>
		);
	}
}

export default App;
