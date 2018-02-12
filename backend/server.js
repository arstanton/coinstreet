import express from "express";
import Server from "socket.io";
import cors from "cors";
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

import GDAX from "./lib/gdax";
import Bitfinex from "./lib/bitfinex";
import Gemini from "./lib/gemini";
import Kraken from "./lib/kraken";
import Bitstamp from "./lib/bitstamp";
import Bithumb from "./lib/bithumb";
import Poloniex from "./lib/poloniex";
import Bittrex from "./lib/bittrex";

const app = express();

dotenv.config({ path: '../.env' });

const PORT = 8080;
const HOST = "0.0.0.0";

// Middleware
app.use(express.static("../public"));
app.use(cors());

const server = app.listen(PORT, HOST, () => {
    console.log(`Started backend on ${HOST}:${PORT}`);
});
const io = new Server(server);

io.set("origins", "localhost:*", "*");

// Use this when client emits an event to server.
io.on("connection", async () => {
	let staticData = await getStaticData();
	io.emit('staticData', staticData);
});

const gdax = new GDAX(io);
const bfx = new Bitfinex(io);
const gem = new Gemini(io);
const kraken = new Kraken(io);
const bitstamp = new Bitstamp(io);
const bithumb = new Bithumb(io);
const poloniex = new Poloniex(io);
const bittrex = new Bittrex(io);

(async function getAveragedData() {
	// return setInterval(async () => {
		let masterData = [
			await gdax.start(), await bfx.start(), await gem.start()]
			// await kraken.start(), await bitstamp.start(), await bithumb.start(), 
			// await poloniex.start(), await bittrex.start()
		// ];
		let coins = {}
		let btc = [];

		masterData.forEach((obj) => {
			Object.entries(obj).forEach(([key, value]) => {
				if (key.includes("BTC") && key.includes("USD")) {
					btc.push(parseFloat(value.last));
				} else if (key.includes("BTC") && !key.includes("USD")) {
					let symbol = key.split("BTC").filter(val => val)[0];

				}
			});
		});
		// print(coins)
		// btc = (btc.reduce((x, y) => x + y)) / btc.length;
	// }, 30000);
}

async function getStaticData() { 
	const uri = "mongodb://csadmin:Miche11e.@coinstreet-shard-00-00-jzu6z.mongodb.net:27017,coinstreet-shard-00-01-jzu6z.mongodb.net:27017,coinstreet-shard-00-02-jzu6z.mongodb.net:27017/test?ssl=true&replicaSet=coinstreet-shard-0&authSource=admin";
	const db = await MongoClient.connect(uri);
	const collection = await db.db("coinstreet").collection("coins");
	return await collection.find().sort({ market_cap: -1 }).toArray();
})();

