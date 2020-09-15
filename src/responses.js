import React from "react";

class ResponsesList extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data : [
		
		],
	};
	componentDidMount() {
		fetch('http://localhost:3001/formsMeta')
			.then(response => response.json())
			.then(response => {
				this.setState(
					{
						data: response
					}
				)
			});
	}
	renderItems(items){
		return items.map(item =>{
			if(!item.name){
				item.name = "<EMPTY>"
			}
			return(
				<li>
					<a href={"/responses/" + item.id}>
						{item.name}
					</a>
				</li>
			)
		})
	}
	
	render() {
		
		return (
			<div>
				<ul>
					{this.renderItems(this.state.data)}
				</ul>
			</div>
		);
	}
}

export default ResponsesList;
