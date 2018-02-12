import React from "react";
// import { Router } from 'react-router';
import { Header } from "./header.jsx";
import { SubNav } from "./sub-nav.jsx";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./css/bootstrap/css/bootstrap.min.css";
import "./css/style.css";
import io from "socket.io-client";

const data = [];
const columns = [
    { Header: "#", accessor: "#" },
    { Header: "Name", accessor: "name" },
    { Header: "Ticker", accessor: "symbol" },
    { Header: "Price", accessor: "last" },
    { Header: "Day % Change", accessor: "percent_change" },
    { Header: "Day High", accessor: "high" },
    { Header: "Day Low", accessor: "low" },
    { Header: "Volume", accessor: "volume" },
    { Header: "Circulating Supply", accessor: "circulating_supply" },
    { Header: "Market Cap", accessor: "market_cap" },
];
const socket = io.connect("http://localhost:8080");

class App extends React.Component {
    state = { 
        data: {},
        last_update: JSON.stringify(new Date())
    };

    async componentDidMount() {
        socket.on("staticData", data => {
            this.setState({ data: data });
        });

        socket.on("gdax_feed", message => {
            this.handleDataFeed(message);
        });

        socket.on("bfx_feed", message => {
            this.handleDataFeed(message);
        });

        socket.on("gem_feed", message => {
           this.handleDataFeed(message);
        });

        socket.on("kraken_feed", message => {
            this.handleDataFeed(message);
        });

        socket.on("bittrex_feed", message => {
            this.handleDataFeed(message)
        });
    }

    handleDataFeed = event => {
        Object.entries(event).forEach(([key, value]) => { 
            if (key.includes("BTC")) {
                let x = key.split('BTC').filter(val => val)[0]
                data[x] = { ...data[x], ...value };
            }
            
        });
        this.setState({
            data: data,
            last_update: JSON.stringify(new Date())
        });
    };

    render() {
        const data = Object.entries(this.state.data)
            .map(([key, value]) => value);
        return (
            <div className="App">
                <div className="Header">
                    <Header />
                </div>
                <h1 className="display-4 text-center">
                    Cryptocurrency Market Tracking
                </h1>
                <div className="container">
                    <SubNav />
                    <div>
                        <p>{this.state.last_update}</p>
                    </div>
                    <ReactTable data={data} columns={columns} />
                </div>
            </div>
        );
    }
}

export default App;
