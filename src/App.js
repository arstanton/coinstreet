import React from "react";
import { Header } from "./header.js";
import { SubNav } from "./sub-nav.js";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./css/bootstrap/css/bootstrap.min.css";
import "./css/style.css";
import io from "socket.io-client";
// import { getPrices } from "./utils/api";

const data = [];
const columns = [
    { Header: "#", accessor: "#" },
    { Header: "Coin", accessor: "coin" },
    { Header: "Ticker", accessor: "ticker" },
    { Header: "Price", accessor: "price" },
    { Header: "% Change", accessor: "percentChange" },
    { Header: "Volume", accessor: "column" },
    { Header: "Circulating Supply", accessor: "circulationSupply" }
];
const socket = io("http://localhost:8080");

class App extends React.Component {
    state = { data: [], binance_data: null };

    async componentDidMount() {
        socket.on("gdax_feed", message => {
            this.handleDataFeed(message);
        });

        socket.on("coinbase_api", message => {
            this.setState({
                coinbase_data: message
            });
        });

        socket.on("binance_data", message => {
            console.log("got updated binance data...");
            this.setState({
                binance_data: message
            });
        });
    }

    handleDataFeed = async event => {
        this.setState({
            data: [...event]
        });
    };

    render() {
        const coins = this.state.data.map(coin => (
            <li key={`${coin.sequence}`}>
                {coin.product_id} --- {coin.side} ---- {coin.price}
            </li>
        ));
        const length = coins.length;
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
                    <ReactTable data={data} columns={columns} />
                </div>

                <div>
                    <br />
                    Last Updated: {`${new Date()}`}
                    <br />
                    Length of Binance Feed: {length}
                    <br />
                    {this.state.binance_data}
                    {/* <ul>{coins}</ul> */}
                    <br />
                    Length of GDAX Feed: {length}
                </div>
            </div>
        );
    }
}

export default App;
