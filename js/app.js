import React from "react";
import { render } from "react-dom";
import io from 'socket.io-client';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// var socket = io('http://localhost:8080');

class MyComponent extends React.Component {
	render() {
		const data = []
		const columns = [ 
			{ Header: '#', accessor: '#' }, 
			{ Header: 'Coin', accessor: 'coin'}, 
			{ Header: 'Ticker', accessor: 'ticker' }, 
			{ Header: 'Price', accessor: 'price' }, 
			{ Header: '% Change', accessor: 'percentChange' }, 
			{ Header: 'Volume', accessor: 'column' }, 
			{ Header: 'Circulating Supply', accessor: 'circulationSupply' }
		];
		return (
			<div>
				<ReactTable
				data={data}
				columns={columns}
				/>
			</div>
		)
	}
}

render(<MyComponent />, document.getElementById("root"));
