import React from "react";
import { FormGenerator } from 'cb-react-forms';

class Generator extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: {}
	};
	formSubmit = (data) => {
		data = JSON.parse(data);
		debugger;
		const {id, formMeta, name} = this.state.data;
		const fields =  formMeta
			.filter(item =>Object.keys(data).includes(item.id))
			.map(item => {
				let value = data[item.id];
				if (item.element === "Dropdown"){
					value = item.options.find(option => option.id === value).value
				}
				return{
					id : item.id,
					name : item.label.blocks[0].text,
					value : value
				}
		});
		debugger;
		const response = {
			formId : id,
			fields : fields,
			formName : name
		};
		fetch('http://localhost:3001/formResponses', {
			method: 'POST',
			body: JSON.stringify(response),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'same-origin',
		}).then(response => response.json())
			.then(response => {
				window.alert("Form submitted successfully!");
				window.location.reload();
			});
		
	};
	
	componentDidMount() {
		fetch('http://localhost:3001/formsMeta/'+ this.props.match.params.formId)
			.then(response => response.json())
			.then(response => {
			this.setState({
				data: response
			})
		});
	}
	
	render() {
		
		return (
			<div>
				<FormGenerator
					formData={this.state.data.formMeta}
					onSubmit={this.formSubmit}
				/>
			</div>
		);
	}
}

export default Generator;
