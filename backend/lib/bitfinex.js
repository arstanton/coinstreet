import { fetchData } from "../utils";

class Bitfinex {
	constructor(socket) {
		this.baseUrl = "https://api.bitfinex.com/";
		this.socket = socket;
	}

	async getData() {
		try {
	    	let tickers = JSON.parse(await fetchData(`${this.baseUrl}/v1/symbols`))
	    		.map(ticker => `t${ticker.toUpperCase()}`)
	    		.join(',');
			return JSON.parse(await fetchData(`${this.baseUrl}/v2/tickers?symbols=${tickers}`));
		} catch (error) {
			console.log(error)
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("bfx_feed", formatData);
		return formatData;
	}

	formatData(data) {
    	let coins = {};
    	data.forEach((row) => {
    		let symbol = row[0].split('t')[1];
			coins[symbol] = {
				bid: row[1],
				bid_size: row[2],
				ask: row[3],
				ask_size: row[4],
				daily_change: row[5],
				percent_change: row[6],
				last: row[7],
				volume: row[8],
				high: row[9],
				low: row[10],
    		}
    	});
    	return coins;
	}
}
export default Bitfinex;
