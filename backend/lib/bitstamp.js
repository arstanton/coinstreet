import { fetchData } from "../utils";

class Bitstamp { 
	constructor(socket) {
		this.baseUrl = "https://www.bitstamp.net/api/v2/";
		this.socket = socket;
	}

	async getData() {
		try {
			let data = {};
			let tickers = JSON.parse(await fetchData(`${this.baseUrl}/trading-pairs-info`))
				.map(ticker => ticker.url_symbol);
			for (let ticker of tickers) {
				data[ticker.toUpperCase()] = JSON.parse(await fetchData(`${this.baseUrl}/ticker/${ticker}`))
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async start() {
		let data = await this.getData();
		let formatData = this.formatData(data);
		this.socket.emit("bitstamp_feed", formatData);
		return formatData;
	}

	formatData(data) {
		let coins = {};
		Object.entries(data).forEach(([coin, product]) => {
			coins[coin] = { ...product,
				percent_change: ((product.last - product.open) / product.open) * 100,
			}
		});
		return coins;
	}
}
export default Bitstamp