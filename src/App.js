import React from 'react';
import UserContainer from './UserContainer';
import TripContainer from './TripContainer';
// import AuthContainer from './AuthContainer';
import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import './App.css';




const My404 = () => {
	return (
		<div>
			GOAWAYYYYYY
		</div>
	)
}



const App = () => {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={ UserContainer }/>
				<Route exact path="/trips" component={ TripContainer }/>
				<Route component={ My404 }/>
			</Switch>
		</main>
	);
}

export default App;
