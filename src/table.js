import React from "react";
import jsonexport from "jsonexport"



class Table extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		data : [],
	};
	componentDidMount() {
		const a = this.props;
		debugger;
		fetch('http://localhost:3001/formResponses?formId='+ this.props.match.params.formId)
			.then(response => response.json())
			.then(response => {
				// debugger;
				this.setState({
					data: response
				})
			});
	}
	
	renderTableHeader(fields){
		return fields.map(field => {
			return(
				<th>
					{field.name}
				</th>
			)
		})
	};
	
	renderTableData(data){
		return data.map(item => {
			return(
				
				<tr>
					<td>
						{item.id}
					</td>
					{item.fields.map(field => <td>{field.value}</td>)}
				</tr>
			)
		})
	}
	
	exportAsCSV(element){
		const data = this.state.data.map((item) => {
			let obj = {};
			item.fields.forEach((field) => {
				obj[field.id] = field.value
			});
			return obj;
		});
		const formName = this.state.data[0].formName;
		debugger;
		const getHeadersNames= () => this.state.data[0].fields.map((field) => field.name);
		const options = {
			rename: getHeadersNames(),
		};
		
		
		
		jsonexport(data,options, function(err, csv){
			if (err)
				return console.error(err);
			var hiddenElement = document.createElement('a');
			hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
			hiddenElement.target = '_blank';
			hiddenElement.download = `${formName}.csv`;
			hiddenElement.click();
		});
	}
	
	render(){
		
		return (
		<div>
			{
				this.state.data.length > 0 ? (
					<div>
						<table>
							<thead>
							
							<tr>
								<th>
									SNo.
								</th>
								{this.renderTableHeader (this.state.data[0].fields)}
							</tr>
							</thead>
							<tbody>
							{this.renderTableData (this.state.data)}
							</tbody>
						
						</table>
						<div>
							<button
								className="btn btn-primary mt-3"
								onClick={(ele) => {this.exportAsCSV(ele.currentTarget)}} >
								Export as .CSV
							</button>
						</div>
					</div>
					
					
				) : (
					<p>
						There are no responses yet....
					</p>
				)
				
			}
			
			
		</div>
		
		
		);
	}
}
export default Table;
