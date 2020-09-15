import React from "react";
import { FormBuilder } from "cb-react-forms";

class Builder extends React.Component {
	state = {
		showForm: false
	};
	submitFn = (data) => {
		const name = window.prompt("Name this form");
		debugger;
		const meta = {
			formMeta: JSON.parse(data),
			name: name
		};
		debugger;
		fetch
		('http://localhost:3001/formsMeta', {
			method: 'POST',
			body:JSON.stringify(meta),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'same-origin',
		})
			.then(response => response.json())
			.then(response =>
			{
			window.alert("Yahoo form created !!! Form-id is: "+ response.id);
			window.location.reload();
		});
	};
	render() {
		return (
			<div>
				<FormBuilder onSubmit={this.submitFn}/>
			</div>
		);
	}
}

export default Builder;
