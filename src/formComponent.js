import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import Builder from "./formbuilder";
import Generator from "./generator";
import List from "./List";
import Table from "./table";
import ResponsesList from "./responses";

class Form extends React.Component {
	render() {
		// debugger;
		return (
			<div>
				<h1>
					This is KMIT
				</h1>
				<Switch>
					<Route path="/builder" component={Builder} />
					<Route path="/form/:formId" component={Generator} />
					<Route path="/list" component={List} />
					<Route path="/responses/:formId" component={Table}/>
					
					<Route path="/responses" component={ResponsesList} />
					<Redirect to="/builder" />
				</Switch>
			</div>
		);
	}
}

export default Form;
