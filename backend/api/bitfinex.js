import request from "request-promise";

class Bitfinex {
	constructor(socket) {
		this.basev1 = "https://api.bitfinex.com/v1";
		this.basev2 = "https://api.bitfinex.com/v2";
		this.socket = socket;
	}

	async getSymbols() {
		return await JSON.parse(await request.get(`${this.basev1}/symbols`)).map(ticker => `t${ticker.toUpperCase()}`).filter(item => item.includes('USD'));
	}

	async getTickers(tickers) {
		return await JSON.parse(await request.get(`${this.basev2}/tickers?symbols=${tickers.join(',')}`));
	}

	async getCoins() {
    	let group = {};
    	let tickers = await this.getSymbols();
		try {
			return await this.getTickers(tickers);
		} catch (error) {
			console.log(error)
		}
	}

	start() {
		return setInterval(async () => {
			let product = await this.getCoins();
			let cleanse = this.cleanseData(product);
			this.socket.emit("bfx_feed", cleanse);
		}, 15000);
	}

	cleanseData(data) {
    	let coins = {};
    	data.forEach((row) => {
    		let symbol = row[0].split('t')[1].split('USD')[0];
			coins[symbol] = {
				bid: row[1],
				bid_size: row[2],
				ask: row[3],
				ask_size: row[4],
				daily_change: row[5],
				percent_change: row[6],
				price: `$ ${row[7]}`,
				volume: row[8],
				high: `$ ${row[9]}`,
				low: `$ ${row[10]}`,
    		}
    	});
    	return coins;
	}
}
export default Bitfinex;
