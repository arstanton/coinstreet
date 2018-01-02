import React from "react";
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
    { Header: "Coin", accessor: "coin" },
    { Header: "Ticker", accessor: "product_id" },
    { Header: "Price", accessor: "price" },
    { Header: "Day % Change", accessor: "percent_change" },
    { Header: "Day High", accessor: "high" },
    { Header: "Day Low", accessor: "low" },
    { Header: "Volume", accessor: "volume" },
    { Header: "Circulating Supply", accessor: "circulationSupply" }
];
const socket = io("http://localhost:8080");

class App extends React.Component {
    state = { 
        data: { 
            "BTC": { coin: 'Bitcoin', product_id: "BTC" },
            "ETH": { coin: 'Ethereum', product_id: "ETH" },
            "LTC": { coin: 'Litecoin', product_id: "LTC" },
            "BCH": { coin: 'Bitcoincash', product_id: "BCH" },
            "ETC": { coin: 'Ethereumclassic', product_id: "ETC" },
            "RRT": { coin: 'Recovery Right Tokens', product_id: "RRT" },
            "ZEC": { coin: 'Zcash', product_id: "ZEC" },
            "XMR": { coin: 'Monero', product_id: "XMR" },
            "DSH": { coin: 'Dashcoin', product_id: "DSH" },
            "XRP": { coin: 'Ripple', product_id: "XRP" },
            "IOT": { coin: 'Iota', product_id: "IOT" },
            "EOS": { coin: 'Eos', product_id: "EOS" },
            "SAN": { coin: 'Santiment', product_id: "SAN" },
            "OMG": { coin: 'Omisego', product_id: "OMG" },
            "NEO": { coin: 'Neo', product_id: "NEO" },
            "ETP": { coin: 'Metaverse ETP', product_id: "ETP" },
            "QTM": { coin: 'Qtum', product_id: "QTM" },
            "AVT": { coin: 'Aventus', product_id: "AVT" },
            "EDO": { coin: 'Eidoo', product_id: "EDO" },
            "BTG": { coin: 'Bitcoin Gold', product_id: "BTG" },
            "DAT": { coin: 'Datum', product_id: "DAT" },
            "QSH": { coin: 'QASH', product_id: "QSH" },
            "YYW": { coin: 'YOYOW', product_id: "YYW" },
            "GNT": { coin: 'Golem', product_id: "GNT" },
            "SNT": { coin: 'Status', product_id: "SNT" }
        },
        last_update: JSON.stringify(new Date())
    };

    async componentDidMount() {
        socket.on("gdax_feed", message => {
            this.handleDataFeed(message);
        });

        socket.on("bfx_feed", message => {
            this.handleDataFeed(message);
        });
    }

    handleDataFeed = event => {
        let data = {};
        Object.entries(this.state.data).forEach(([key, value]) => {
            data[key] = { ...value, ...event[key] };
        });
        this.setState({
            data: data,
            last_update: JSON.stringify(new Date())
        });
    };

    render() {
        const data = Object.entries(this.state.data).map(([key, value]) => value);
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
