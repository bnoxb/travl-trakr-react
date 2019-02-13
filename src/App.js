import React from 'react';
import AuthContainer from './AuthContainer';
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


// Has react router ready for expansion
// Auth Container holds everything
const App = () => {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={ AuthContainer }/>
				<Route component={ My404 }/>
			</Switch>
		</main>
	);
}

export default App;
