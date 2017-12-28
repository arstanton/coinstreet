import express from "express";
import Server from "socket.io";
import cors from "cors";
import Gdax from "gdax";
import Coinbase from "./coinbase";
import { getPrices } from "../src/utils/api";
import request from "request-promise";

const app = express();
const coinbase = new Coinbase();
const websocket = new Gdax.WebsocketClient(["BTC-USD", "ETH-USD"]);

const PORT = 8080;
const HOST = "0.0.0.0";

// Middleware
app.use(express.static("public"));
app.use(cors());

// Routes
app.get("/", async (req, res) => {
    res.sendFile("views/index.html", { root: __dirname });
});

app.get("/prices/:currency_pair", async (req, res) => {
    res.json(await coinbase.getPrice(req.params.currency_pair, "SPOT"));
});

// Setup web server and socket.io server.
// const server = http.createServer(app);
const server = app.listen(PORT, HOST, () => {
    console.log(`Started backend on ${HOST}:${PORT}`);
});
const io = new Server(server);

io.set("origins", "localhost:*", "*");

// Use this when client emits an event to server.
io.on("connected", message => {
    console.log(`I got a message ${message}`);
});
let interval = [];

// GDAX Websocket Event handlers.
websocket.on("message", async data => {
    interval.push(data);
});

// Set the time interval to 5 seconds so we don't break react.
setInterval(() => {
    io.emit("gdax_feed", interval);
    interval = [];
}, 5000);

setInterval(async () => {
    // io.emit("coinbase_api", await coinbase.getPrice("BTC-USD", "SPOT"));
    const response = await request(
        "https://api.binance.com/api/v1/ticker/allPrices"
    );
    io.emit("binance_data", response);
}, 5000);

websocket.on("error", err => {
    /* handle error */
});
websocket.on("close", () => {
    /* ... */
});

const BFX = require("bitfinex-api-node");

const API_KEY = "secret";
const API_SECRET = "secret";

const opts = {
    version: 2,
    transform: true
};

const bws = new BFX(API_KEY, API_SECRET, opts).ws;
bws.on("auth", () => {
    // emitted after .auth()
    // needed for private api endpoints

    console.log("authenticated");
    // bws.submitOrder ...
});

bws.on("open", () => {
    bws.subscribeTicker("BTCUSD");

    // authenticate
    // bws.auth()
});

bws.on("orderbook", (pair, book) => {
    console.log("Order book:", book);
});

bws.on("trade", (pair, trade) => {
    console.log("Trade:", trade);
});
let tickers = {};
bws.on("ticker", (pair, ticker) => {
    console.log(pair, " Ticker:", ticker);
});

bws.on("error", console.error);
