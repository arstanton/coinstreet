import React from "react";
import { render } from "react-dom";
import { Header } from "./header.js";
import { SubNav } from "./sub-nav.js";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./css/bootstrap/css/bootstrap.min.css";
import "./css/style.css";

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

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<div className="Header">
					<Header />
				</div>
				<h1 className="display-4 text-center">Cryptocurrency Market Tracking</h1>
				<div className="container">
					<SubNav />
					<ReactTable
						data={data}
						columns={columns}
					/>
				</div>
			</div>
		)
	}
}

export default App;